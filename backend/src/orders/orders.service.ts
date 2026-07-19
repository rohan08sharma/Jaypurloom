import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto, CreateReturnDto } from './dto/orders.dto';
import { OrderStatus, PaymentStatus, PaymentMethod, TransactionType } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async createOrder(userId: string, dto: CreateOrderDto) {
    if (!dto.items || dto.items.length === 0) {
      throw new BadRequestException('Cannot place an order with an empty item list.');
    }

    let subtotalAmount = 0;
    let gstAmount = 0;
    const orderItemsData = [];

    // Validate items and compute totals
    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true },
      });

      if (!product) {
        throw new NotFoundException(`Product ${item.productId} not found.`);
      }

      let variant = product.variants.find((v) => v.id === item.variantId);
      if (!variant && product.variants.length > 0) {
        variant = product.variants[0];
      }

      if (!variant) {
        throw new BadRequestException(`No valid variant found for product ${product.title}.`);
      }

      if (variant.stock < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for ${product.title} (${variant.color} - ${variant.size}). Available: ${variant.stock}`,
        );
      }

      const itemTotal = variant.price * item.quantity;
      const itemGst = (itemTotal * product.gstRate) / 100;

      subtotalAmount += itemTotal;
      gstAmount += itemGst;

      orderItemsData.push({
        variantId: variant.id,
        productId: product.id,
        productTitle: product.title,
        variantColor: variant.color,
        variantSize: variant.size,
        quantity: item.quantity,
        priceAtPurchase: variant.price,
        gstAtPurchase: itemGst,
      });
    }

    // Gift wrap fee
    const giftWrapFee = dto.giftWrap ? 99 : 0;

    // Coupon discount calculation
    let couponDiscount = 0;
    if (dto.couponCode) {
      const coupon = await this.prisma.coupon.findUnique({
        where: { code: dto.couponCode.toUpperCase() },
      });

      if (coupon && coupon.isActive && new Date() <= coupon.expiryDate && subtotalAmount >= coupon.minOrderAmount) {
        if (coupon.type === 'PERCENTAGE') {
          couponDiscount = (subtotalAmount * coupon.value) / 100;
          if (coupon.maxDiscount && couponDiscount > coupon.maxDiscount) {
            couponDiscount = coupon.maxDiscount;
          }
        } else {
          couponDiscount = coupon.value;
        }

        // Increment usage
        await this.prisma.coupon.update({
          where: { id: coupon.id },
          data: { usedCount: { increment: 1 } },
        });
      }
    }

    // Shipping amount: Free if subtotal > 2000, else 149
    const shippingAmount = subtotalAmount > 2000 ? 0 : 149;
    const totalAmount = subtotalAmount + gstAmount + giftWrapFee + shippingAmount - couponDiscount;

    // Wallet payment deduction check
    if (dto.paymentMethod === PaymentMethod.WALLET) {
      const user = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!user || user.walletBalance < totalAmount) {
        throw new BadRequestException(`Insufficient wallet balance (₹${user?.walletBalance || 0}). Order total: ₹${totalAmount}`);
      }
    }

    const orderNumber = `JPL-${Date.now().toString().slice(-6)}`;

    // Create order inside transaction
    const order = await this.prisma.$transaction(async (tx) => {
      // Deduct stock
      for (const item of orderItemsData) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stock: { decrement: item.quantity } },
          });
        }
      }

      // Deduct wallet if WALLET payment
      if (dto.paymentMethod === PaymentMethod.WALLET) {
        await tx.user.update({
          where: { id: userId },
          data: { walletBalance: { decrement: totalAmount } },
        });
      }

      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId,
          status: OrderStatus.CONFIRMED,
          subtotalAmount,
          gstAmount,
          shippingAmount: shippingAmount + giftWrapFee,
          couponDiscount,
          totalAmount,
          couponCode: dto.couponCode,
          paymentMethod: dto.paymentMethod,
          paymentStatus:
            dto.paymentMethod === PaymentMethod.COD ? PaymentStatus.PENDING : PaymentStatus.COMPLETED,
          shippingAddress: typeof dto.shippingAddress === 'string' ? dto.shippingAddress : JSON.stringify(dto.shippingAddress),
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: true,
        },
      });

      // If wallet payment, log transaction
      if (dto.paymentMethod === PaymentMethod.WALLET) {
        await tx.walletTransaction.create({
          data: {
            userId,
            amount: totalAmount,
            type: TransactionType.DEBIT,
            description: `Payment for order #${orderNumber}`,
            orderId: newOrder.id,
          },
        });
      }

      // Create confirmation notification
      await tx.notification.create({
        data: {
          userId,
          title: `Order Placed Successfully! (${orderNumber})`,
          message: `Thank you for shopping with Jaypurloom. Your luxury order has been confirmed and is being prepped by our artisans.`,
          type: 'ORDER',
        },
      });

      return newOrder;
    });

    // If Razorpay, return simulated order response or real
    return {
      message: 'Order created successfully!',
      order,
      paymentGateway: {
        method: dto.paymentMethod,
        razorpayOrderId: dto.paymentMethod === PaymentMethod.RAZORPAY ? `rzp_order_sim_${Date.now()}` : undefined,
        upiVpa: dto.paymentMethod === PaymentMethod.UPI ? 'jaypurloom@icici' : undefined,
      },
    };
  }

  async getCustomerOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: true,
        returnRequest: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getOrderDetails(orderId: string, userId?: string) {
    const where: any = { id: orderId };
    if (userId) where.userId = userId;

    const order = await this.prisma.order.findFirst({
      where,
      include: {
        items: true,
        returnRequest: true,
        user: {
          select: { name: true, email: true, phone: true },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order not found.`);
    }

    return order;
  }

  // Admin Methods
  async getAllOrdersAdmin(status?: OrderStatus) {
    const where: any = {};
    if (status) where.status = status;

    return this.prisma.order.findMany({
      where,
      include: {
        items: true,
        user: {
          select: { name: true, email: true, phone: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateOrderStatus(orderId: string, dto: UpdateOrderStatusDto) {
    const order = await this.prisma.order.findUnique({ where: { id: orderId } });
    if (!order) {
      throw new NotFoundException(`Order not found.`);
    }

    const updated = await this.prisma.order.update({
      where: { id: orderId },
      data: {
        status: dto.status,
        trackingNumber: dto.trackingNumber || order.trackingNumber,
      },
    });

    // Notify customer
    await this.prisma.notification.create({
      data: {
        userId: order.userId,
        title: `Order Status Updated: ${dto.status}`,
        message: `Your Jaypurloom order #${order.orderNumber} status is now ${dto.status}.${
          dto.trackingNumber ? ` Tracking Number: ${dto.trackingNumber}` : ''
        }`,
        type: 'ORDER',
      },
    });

    return updated;
  }

  async initiateReturn(userId: string, orderId: string, dto: CreateReturnDto) {
    const order = await this.prisma.order.findFirst({
      where: { id: orderId, userId },
    });

    if (!order) {
      throw new NotFoundException(`Order not found.`);
    }

    const existingReturn = await this.prisma.returnRequest.findUnique({
      where: { orderId },
    });

    if (existingReturn) {
      throw new BadRequestException('A return request has already been submitted for this order.');
    }

    const returnReq = await this.prisma.returnRequest.create({
      data: {
        userId,
        orderId,
        reason: dto.reason,
        comments: dto.comments,
        images: dto.images ? JSON.stringify(dto.images) : null,
      },
    });

    await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.RETURNED },
    });

    return {
      message: 'Return request initiated successfully. Our courier will pick up within 48 hours.',
      returnRequest: returnReq,
    };
  }
}
