import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto, CreateAddressDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        addresses: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User profile not found.');
    }
    const { password, ...result } = user;
    return result;
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const updated = await this.prisma.user.update({
      where: { id: userId },
      data: dto,
    });
    const { password, ...result } = updated;
    return result;
  }

  async getAddresses(userId: string) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: { isDefault: 'desc' },
    });
  }

  async createAddress(userId: string, dto: CreateAddressDto) {
    if (dto.isDefault) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { isDefault: false },
      });
    }
    return this.prisma.address.create({
      data: {
        ...dto,
        userId,
        country: dto.country || 'India',
      },
    });
  }

  async deleteAddress(userId: string, addressId: string) {
    return this.prisma.address.delete({
      where: { id: addressId, userId },
    });
  }

  // Admin Methods
  async getAllCustomers() {
    const customers = await this.prisma.user.findMany({
      where: { role: 'CUSTOMER' },
      include: {
        orders: {
          select: { totalAmount: true, status: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return customers.map((c) => {
      const { password, ...info } = c;
      const lifetimeSpend = c.orders
        .filter((o) => o.status === 'DELIVERED')
        .reduce((sum, o) => sum + o.totalAmount, 0);
      return {
        ...info,
        totalOrders: c.orders.length,
        lifetimeSpend,
      };
    });
  }
}
