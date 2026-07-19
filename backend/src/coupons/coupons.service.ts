import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCouponDto, ValidateCouponDto } from './dto/coupons.dto';

@Injectable()
export class CouponsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.coupon.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async validateCoupon(dto: ValidateCouponDto) {
    const coupon = await this.prisma.coupon.findUnique({
      where: { code: dto.code.toUpperCase() },
    });

    if (!coupon) {
      throw new NotFoundException('Invalid coupon code.');
    }

    if (!coupon.isActive) {
      throw new BadRequestException('This coupon code is currently inactive.');
    }

    if (new Date() > coupon.expiryDate) {
      throw new BadRequestException('This coupon code has expired.');
    }

    if (coupon.usedCount >= coupon.usageLimit) {
      throw new BadRequestException('This coupon code usage limit has been reached.');
    }

    if (dto.orderTotal < coupon.minOrderAmount) {
      throw new BadRequestException(`Minimum order value of ₹${coupon.minOrderAmount} required to apply this coupon.`);
    }

    let discount = 0;
    if (coupon.type === 'PERCENTAGE') {
      discount = (dto.orderTotal * coupon.value) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.value;
    }

    return {
      valid: true,
      code: coupon.code,
      type: coupon.type,
      value: coupon.value,
      discount: Math.round(discount),
      newTotal: Math.round(dto.orderTotal - discount),
      message: `Coupon ${coupon.code} applied! You save ₹${Math.round(discount)}`,
    };
  }

  async create(dto: CreateCouponDto) {
    const existing = await this.prisma.coupon.findUnique({
      where: { code: dto.code.toUpperCase() },
    });

    if (existing) {
      throw new BadRequestException('Coupon code already exists.');
    }

    return this.prisma.coupon.create({
      data: {
        code: dto.code.toUpperCase(),
        type: dto.type,
        value: dto.value,
        minOrderAmount: dto.minOrderAmount,
        maxDiscount: dto.maxDiscount,
        expiryDate: new Date(dto.expiryDate),
        usageLimit: dto.usageLimit || 100,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.coupon.delete({ where: { id } });
  }
}
