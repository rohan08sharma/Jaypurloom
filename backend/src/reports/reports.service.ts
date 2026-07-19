import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getSalesSummary() {
    const orders = await this.prisma.order.findMany({
      where: { status: { not: 'CANCELLED' } },
      orderBy: { createdAt: 'desc' },
    });

    const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const totalGst = orders.reduce((sum, o) => sum + o.gstAmount, 0);
    const totalShipping = orders.reduce((sum, o) => sum + o.shippingAmount, 0);
    const totalDiscount = orders.reduce((sum, o) => sum + o.couponDiscount, 0);
    const totalOrdersCount = orders.length;

    // Daily breakdown for past 7 days
    const dailyMap: { [date: string]: { date: string; revenue: number; orders: number } } = {};
    const today = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      dailyMap[dateStr] = { date: dateStr, revenue: 0, orders: 0 };
    }

    // Monthly breakdown for current year
    const monthlyMap: { [month: string]: { month: string; revenue: number; orders: number } } = {
      Jan: { month: 'Jan', revenue: 0, orders: 0 },
      Feb: { month: 'Feb', revenue: 0, orders: 0 },
      Mar: { month: 'Mar', revenue: 0, orders: 0 },
      Apr: { month: 'Apr', revenue: 0, orders: 0 },
      May: { month: 'May', revenue: 0, orders: 0 },
      Jun: { month: 'Jun', revenue: 0, orders: 0 },
      Jul: { month: 'Jul', revenue: 0, orders: 0 },
      Aug: { month: 'Aug', revenue: 0, orders: 0 },
      Sep: { month: 'Sep', revenue: 0, orders: 0 },
      Oct: { month: 'Oct', revenue: 0, orders: 0 },
      Nov: { month: 'Nov', revenue: 0, orders: 0 },
      Dec: { month: 'Dec', revenue: 0, orders: 0 },
    };
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    orders.forEach((o) => {
      const dateStr = o.createdAt.toISOString().split('T')[0];
      if (dailyMap[dateStr]) {
        dailyMap[dateStr].revenue += o.totalAmount;
        dailyMap[dateStr].orders += 1;
      }
      const mIndex = o.createdAt.getMonth();
      const mName = monthNames[mIndex];
      if (monthlyMap[mName]) {
        monthlyMap[mName].revenue += o.totalAmount;
        monthlyMap[mName].orders += 1;
      }
    });

    return {
      overview: {
        totalRevenue: Math.round(totalRevenue),
        totalGst: Math.round(totalGst),
        totalShipping: Math.round(totalShipping),
        totalDiscount: Math.round(totalDiscount),
        totalOrdersCount,
        averageOrderValue: totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0,
      },
      dailySales: Object.values(dailyMap),
      monthlySales: Object.values(monthlyMap),
    };
  }

  async getTopProductsAndCategories() {
    const orderItems = await this.prisma.orderItem.findMany({
      include: {
        product: {
          select: {
            title: true,
            slug: true,
            category: { select: { name: true } },
          },
        },
      },
    });

    const productStats: { [id: string]: { title: string; category: string; count: number; revenue: number } } = {};
    const categoryStats: { [cat: string]: { category: string; count: number; revenue: number } } = {};

    orderItems.forEach((item) => {
      const pid = item.productId;
      const cname = item.product?.category?.name || 'Uncategorized';
      const rev = item.priceAtPurchase * item.quantity;

      if (!productStats[pid]) {
        productStats[pid] = { title: item.productTitle, category: cname, count: 0, revenue: 0 };
      }
      productStats[pid].count += item.quantity;
      productStats[pid].revenue += rev;

      if (!categoryStats[cname]) {
        categoryStats[cname] = { category: cname, count: 0, revenue: 0 };
      }
      categoryStats[cname].count += item.quantity;
      categoryStats[cname].revenue += rev;
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 10);

    const topCategories = Object.values(categoryStats)
      .sort((a, b) => b.revenue - a.revenue);

    return {
      topProducts,
      topCategories,
    };
  }

  async getGstReport() {
    const orders = await this.prisma.order.findMany({
      where: { status: { not: 'CANCELLED' } },
      include: {
        items: {
          include: {
            product: {
              select: { gstRate: true, category: { select: { name: true } } },
            },
          },
        },
      },
    });

    const gstSlabs: { [rate: string]: { rate: string; taxableValue: number; gstCollected: number; itemsCount: number } } = {
      '12%': { rate: '12% (Textiles & Apparel)', taxableValue: 0, gstCollected: 0, itemsCount: 0 },
      '18%': { rate: '18% (Home Furnishing)', taxableValue: 0, gstCollected: 0, itemsCount: 0 },
    };

    orders.forEach((o) => {
      o.items.forEach((item) => {
        const rate = item.product?.gstRate || 12;
        const key = rate === 18 ? '18%' : '12%';
        const taxable = item.priceAtPurchase * item.quantity;
        const gst = item.gstAtPurchase;

        if (!gstSlabs[key]) {
          gstSlabs[key] = { rate: `${rate}%`, taxableValue: 0, gstCollected: 0, itemsCount: 0 };
        }
        gstSlabs[key].taxableValue += taxable;
        gstSlabs[key].gstCollected += gst;
        gstSlabs[key].itemsCount += item.quantity;
      });
    });

    return {
      slabs: Object.values(gstSlabs),
      totalTaxableValue: Object.values(gstSlabs).reduce((sum, s) => sum + s.taxableValue, 0),
      totalGstCollected: Object.values(gstSlabs).reduce((sum, s) => sum + s.gstCollected, 0),
    };
  }
}
