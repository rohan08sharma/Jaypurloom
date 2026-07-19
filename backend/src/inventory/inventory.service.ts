import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getInventorySummary() {
    const variants = await this.prisma.productVariant.findMany({
      include: {
        product: {
          select: { title: true, slug: true, category: { select: { name: true } } },
        },
      },
      orderBy: { stock: 'asc' },
    });

    const lowStock = variants.filter((v) => v.stock > 0 && v.stock <= v.lowStockThreshold);
    const outOfStock = variants.filter((v) => v.stock <= 0);
    const healthyStock = variants.filter((v) => v.stock > v.lowStockThreshold);

    const totalStockCount = variants.reduce((sum, v) => sum + v.stock, 0);
    const totalInventoryValue = variants.reduce((sum, v) => sum + v.price * v.stock, 0);

    return {
      summary: {
        totalVariants: variants.length,
        totalStockCount,
        totalInventoryValue,
        lowStockCount: lowStock.length,
        outOfStockCount: outOfStock.length,
        healthyCount: healthyStock.length,
      },
      lowStockAlerts: lowStock.map((v) => ({
        variantId: v.id,
        productTitle: v.product.title,
        category: v.product.category.name,
        sku: v.sku,
        color: v.color,
        size: v.size,
        stock: v.stock,
        threshold: v.lowStockThreshold,
        status: 'LOW_STOCK',
      })),
      outOfStockAlerts: outOfStock.map((v) => ({
        variantId: v.id,
        productTitle: v.product.title,
        category: v.product.category.name,
        sku: v.sku,
        color: v.color,
        size: v.size,
        stock: v.stock,
        status: 'OUT_OF_STOCK',
      })),
      allInventory: variants.map((v) => ({
        id: v.id,
        productId: v.productId,
        productTitle: v.product.title,
        category: v.product.category.name,
        sku: v.sku,
        barcode: v.barcode,
        color: v.color,
        size: v.size,
        mrp: v.mrp,
        price: v.price,
        stock: v.stock,
        lowStockThreshold: v.lowStockThreshold,
      })),
    };
  }

  async adjustStock(variantId: string, quantityChange: number, reason: string = 'Manual Adjustment') {
    const variant = await this.prisma.productVariant.findUnique({
      where: { id: variantId },
      include: { product: true },
    });

    if (!variant) {
      throw new NotFoundException('Variant not found.');
    }

    const newStock = Math.max(0, variant.stock + quantityChange);

    const updated = await this.prisma.productVariant.update({
      where: { id: variantId },
      data: { stock: newStock },
    });

    return {
      success: true,
      message: `Updated stock for ${variant.product.title} (${variant.color} - ${variant.size}) from ${variant.stock} to ${newStock}. Reason: ${reason}`,
      variant: updated,
    };
  }
}
