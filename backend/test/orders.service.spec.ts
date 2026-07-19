import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../src/orders/orders.service';
import { PrismaService } from '../src/prisma/prisma.service';
import { PaymentMethod } from '@prisma/client';

describe('OrdersService', () => {
  let service: OrdersService;

  const mockPrismaService = {
    product: {
      findUnique: jest.fn().mockResolvedValue({
        id: 'prod-1',
        title: 'Chanderi Silk Suit',
        gstRate: 12,
        variants: [
          {
            id: 'var-1',
            price: 3000,
            stock: 10,
            color: 'Maroon',
            size: 'M',
          },
        ],
      }),
    },
    $transaction: jest.fn().mockImplementation((callback) => {
      const txMock = {
        productVariant: { update: jest.fn() },
        order: {
          create: jest.fn().mockResolvedValue({
            id: 'ord-123',
            orderNumber: 'JPL-891011',
            totalAmount: 3360,
          }),
        },
        notification: { create: jest.fn() },
      };
      return callback(txMock);
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should create an order with accurate GST and free shipping calculation', async () => {
    const res = await service.createOrder('user-1', {
      items: [{ productId: 'prod-1', variantId: 'var-1', quantity: 1 }],
      shippingAddress: 'Flat 402, C-Scheme Jaipur',
      paymentMethod: PaymentMethod.RAZORPAY,
    });

    expect(res.message).toBe('Order created successfully!');
    expect(res.order.id).toBe('ord-123');
    expect(res.paymentGateway.razorpayOrderId).toBeDefined();
  });
});
