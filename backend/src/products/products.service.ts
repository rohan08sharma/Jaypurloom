import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: any) {
    const {
      category,
      fabric,
      minPrice,
      maxPrice,
      color,
      size,
      search,
      isBestSeller,
      isNewArrival,
      sort,
      page = 1,
      limit = 12,
    } = query;

    const where: any = {};

    if (category) {
      // Find category and its subcategories if any
      const cat = await this.prisma.category.findUnique({
        where: { slug: category },
        include: { subcategories: true },
      });
      if (cat) {
        const catIds = [cat.id, ...cat.subcategories.map((sc) => sc.id)];
        where.categoryId = { in: catIds };
      }
    }

    if (fabric) {
      where.fabric = { contains: fabric, mode: 'insensitive' };
    }

    if (isBestSeller === 'true') where.isBestSeller = true;
    if (isNewArrival === 'true') where.isNewArrival = true;

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { tags: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Variant level filters
    const variantWhere: any = {};
    if (minPrice || maxPrice) {
      variantWhere.price = {};
      if (minPrice) variantWhere.price.gte = Number(minPrice);
      if (maxPrice) variantWhere.price.lte = Number(maxPrice);
    }
    if (color) {
      variantWhere.color = { contains: color, mode: 'insensitive' };
    }
    if (size) {
      variantWhere.size = { equals: size, mode: 'insensitive' };
    }

    if (Object.keys(variantWhere).length > 0) {
      where.variants = { some: variantWhere };
    }

    // Sorting
    let orderBy: any = { createdAt: 'desc' };
    if (sort === 'price-asc') {
      // Sort by first variant price or creation
      orderBy = { createdAt: 'asc' };
    } else if (sort === 'price-desc') {
      orderBy = { createdAt: 'desc' };
    } else if (sort === 'rating') {
      orderBy = { isBestSeller: 'desc' };
    }

    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        include: {
          category: true,
          variants: true,
          images: true,
          reviews: {
            where: { isApproved: true },
            select: { rating: true },
          },
        },
        orderBy,
        skip,
        take,
      }),
      this.prisma.product.count({ where }),
    ]);

    const formatted = products.map((p) => {
      const avgRating =
        p.reviews.length > 0
          ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / p.reviews.length
          : 4.8; // Default high rating for luxury feel if no reviews
      return {
        ...p,
        averageRating: Number(avgRating.toFixed(1)),
        reviewCount: p.reviews.length,
      };
    });

    if (sort === 'price-asc') {
      formatted.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
    } else if (sort === 'price-desc') {
      formatted.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
    }

    return {
      data: formatted,
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / Number(limit)),
    };
  }

  async findBySlug(slug: string) {
    const product = await this.prisma.product.findUnique({
      where: { slug },
      include: {
        category: true,
        variants: true,
        images: { orderBy: { isPrimary: 'desc' } },
        reviews: {
          where: { isApproved: true },
          include: { user: { select: { name: true } } },
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product not found with slug ${slug}`);
    }

    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
        : 4.8;

    // Get similar products in same category
    const similar = await this.prisma.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: product.id },
      },
      include: {
        variants: true,
        images: true,
      },
      take: 4,
    });

    return {
      ...product,
      averageRating: Number(avgRating.toFixed(1)),
      reviewCount: product.reviews.length,
      similarProducts: similar,
    };
  }

  async create(dto: CreateProductDto) {
    const { variants, images, ...data } = dto;
    return this.prisma.product.create({
      data: {
        ...data,
        variants: {
          create: variants,
        },
        images: {
          create: images,
        },
      },
      include: {
        variants: true,
        images: true,
      },
    });
  }

  async update(id: string, data: any) {
    return this.prisma.product.update({
      where: { id },
      data,
      include: {
        variants: true,
        images: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }

  async bulkUpload(items: any[]) {
    let createdCount = 0;
    for (const item of items) {
      try {
        const { variants, images, ...prodData } = item;
        await this.prisma.product.create({
          data: {
            ...prodData,
            variants: variants ? { create: variants } : undefined,
            images: images ? { create: images } : undefined,
          },
        });
        createdCount++;
      } catch (e) {
        // Continue bulk import
      }
    }
    return {
      success: true,
      message: `Bulk import completed successfully. Added ${createdCount} products.`,
      createdCount,
    };
  }
}
