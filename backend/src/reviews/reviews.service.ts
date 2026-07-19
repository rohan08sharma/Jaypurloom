import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateReviewDto } from './dto/reviews.dto';

@Injectable()
export class ReviewsService {
  constructor(private prisma: PrismaService) {}

  async getProductReviews(productId: string) {
    const reviews = await this.prisma.review.findMany({
      where: { productId, isApproved: true },
      include: {
        user: {
          select: { name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    let sum = 0;

    const formatted = reviews.map((r) => {
      breakdown[r.rating] = (breakdown[r.rating] || 0) + 1;
      sum += r.rating;
      return {
        id: r.id,
        rating: r.rating,
        title: r.title,
        comment: r.comment,
        images: r.images ? JSON.parse(r.images) : [],
        isVerifiedPurchase: r.isVerifiedPurchase,
        author: r.user.name,
        createdAt: r.createdAt,
      };
    });

    const avg = reviews.length > 0 ? Number((sum / reviews.length).toFixed(1)) : 4.8;

    return {
      reviews: formatted,
      averageRating: avg,
      totalReviews: reviews.length,
      breakdown,
    };
  }

  async createReview(userId: string, dto: CreateReviewDto) {
    // Check if user has purchased this product
    const orderItem = await this.prisma.orderItem.findFirst({
      where: {
        productId: dto.productId,
        order: {
          userId,
          status: 'DELIVERED',
        },
      },
    });

    const isVerifiedPurchase = !!orderItem;

    const review = await this.prisma.review.create({
      data: {
        userId,
        productId: dto.productId,
        rating: dto.rating,
        title: dto.title,
        comment: dto.comment,
        images: dto.images ? JSON.stringify(dto.images) : null,
        isVerifiedPurchase,
        isApproved: true, // Auto-approved for seamless demo experience
      },
      include: {
        user: { select: { name: true } },
      },
    });

    return {
      message: 'Review submitted successfully!',
      review: {
        ...review,
        author: review.user.name,
        images: dto.images || [],
      },
    };
  }

  // Admin moderation
  async getAllReviewsAdmin() {
    const reviews = await this.prisma.review.findMany({
      include: {
        user: { select: { name: true, email: true } },
        product: { select: { title: true, slug: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return reviews.map((r) => ({
      ...r,
      author: r.user.name,
      images: r.images ? JSON.parse(r.images) : [],
    }));
  }

  async toggleApproval(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found.');

    return this.prisma.review.update({
      where: { id },
      data: { isApproved: !review.isApproved },
    });
  }

  async removeReview(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }
}
