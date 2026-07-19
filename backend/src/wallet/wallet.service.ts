import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionType } from '@prisma/client';

@Injectable()
export class WalletService {
  constructor(private prisma: PrismaService) {}

  async getBalanceAndHistory(userId: string) {
    const [user, history] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: userId },
        select: { walletBalance: true },
      }),
      this.prisma.walletTransaction.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      balance: user?.walletBalance || 0.0,
      transactions: history,
    };
  }

  async addFunds(userId: string, amount: number) {
    if (amount <= 0 || amount > 50000) {
      throw new BadRequestException('Amount must be between ₹1 and ₹50,000.');
    }

    const updated = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.update({
        where: { id: userId },
        data: { walletBalance: { increment: amount } },
      });

      const txRecord = await tx.walletTransaction.create({
        data: {
          userId,
          amount,
          type: TransactionType.CREDIT,
          description: `Added funds via Payment Gateway (Simulated)`,
        },
      });

      return { balance: user.walletBalance, transaction: txRecord };
    });

    return {
      success: true,
      message: `₹${amount} added to your Jaypurloom digital wallet successfully!`,
      balance: updated.balance,
      transaction: updated.transaction,
    };
  }
}
