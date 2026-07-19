import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string) {
    return this.prisma.wishlist.findMany({
      where: { userId },
      include: {
        product: {
          include: {
            variants: true,
            images: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async toggleWishlist(userId: string, productId: string) {
    const existing = await this.prisma.wishlist.findUnique({
      where: {
        userId_productId: { userId, productId },
      },
    });

    if (existing) {
      await this.prisma.wishlist.delete({
        where: { id: existing.id },
      });
      return { added: false, message: 'Removed from wishlist' };
    } else {
      await this.prisma.wishlist.create({
        data: { userId, productId },
      });
      return { added: true, message: 'Added to wishlist' };
    }
  }

  async clearWishlist(userId: string) {
    return this.prisma.wishlist.deleteMany({ where: { userId } });
  }
}
