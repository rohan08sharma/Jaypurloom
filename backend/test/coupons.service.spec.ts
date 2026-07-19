import { Test, TestingModule } from '@nestjs/testing';
import { CouponsService } from '../src/coupons/coupons.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('CouponsService', () => {
  let service: CouponsService;

  const mockPrismaService = {
    coupon: {
      findUnique: jest.fn().mockResolvedValue({
        code: 'FESTIVE20',
        type: 'PERCENTAGE',
        value: 20,
        minOrderAmount: 2000,
        maxDiscount: 1000,
        isActive: true,
        expiryDate: new Date('2028-12-31'),
        usedCount: 5,
        usageLimit: 100,
      }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CouponsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CouponsService>(CouponsService);
  });

  it('should validate coupon code and compute exact discount percentage with max limit check', async () => {
    const result = await service.validateCoupon({
      code: 'FESTIVE20',
      orderTotal: 4000,
    });

    expect(result.valid).toBe(true);
    expect(result.discount).toBe(800); // 20% of 4000
    expect(result.newTotal).toBe(3200);
  });
});
