import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        variant: {
          include: {
            product: {
              include: {
                images: true,
              },
            },
          },
        },
      },
    });

    let subtotal = 0;
    let gstAmount = 0;

    const formatted = items.map((item) => {
      const price = item.variant.price;
      const gstRate = item.variant.product.gstRate;
      const itemTotal = price * item.quantity;
      const itemGst = (itemTotal * gstRate) / 100;

      subtotal += itemTotal;
      gstAmount += itemGst;

      return {
        id: item.id,
        variantId: item.variantId,
        productId: item.variant.productId,
        productTitle: item.variant.product.title,
        slug: item.variant.product.slug,
        color: item.variant.color,
        size: item.variant.size,
        price: item.variant.price,
        mrp: item.variant.mrp,
        stock: item.variant.stock,
        quantity: item.quantity,
        gstRate,
        image: item.variant.product.images[0]?.url || '',
      };
    });

    const shippingAmount = subtotal > 2000 || subtotal === 0 ? 0 : 149;
    const total = subtotal + gstAmount + shippingAmount;

    return {
      items: formatted,
      subtotal,
      gstAmount,
      shippingAmount,
      total,
      freeShippingThreshold: 2000,
      freeShippingProgress: subtotal >= 2000 ? 100 : Math.round((subtotal / 2000) * 100),
    };
  }

  async addToCart(userId: string, variantId: string, quantity: number = 1) {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
    });

    if (!variant) {
      throw new NotFoundException('Product variant not found.');
    }

    const existing = await this.prisma.cartItem.findUnique({
      where: {
        userId_variantId: { userId, variantId },
      },
    });

    if (existing) {
      return this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    }

    return this.prisma.cartItem.create({
      data: {
        userId,
        variantId,
        quantity,
      },
    });
  }

  async updateQuantity(userId: string, cartItemId: string, quantity: number) {
    if (quantity <= 0) {
      return this.removeItem(userId, cartItemId);
    }
    return this.prisma.cartItem.update({
      where: { id: cartItemId, userId },
      data: { quantity },
    });
  }

  async removeItem(userId: string, cartItemId: string) {
    return this.prisma.cartItem.delete({
      where: { id: cartItemId, userId },
    });
  }

  async clearCart(userId: string) {
    return this.prisma.cartItem.deleteMany({
      where: { userId },
    });
  }
}
