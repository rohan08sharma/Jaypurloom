import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from '../src/products/products.service';
import { PrismaService } from '../src/prisma/prisma.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn().mockResolvedValue([
        {
          id: 'prod-1',
          title: 'Royal Maroon Zari Anarkali',
          slug: 'royal-maroon-zari-anarkali',
          price: 4499,
          isBestSeller: true,
          reviews: [{ rating: 5 }, { rating: 5 }],
        },
      ]),
      count: jest.fn().mockResolvedValue(1),
      findUnique: jest.fn().mockResolvedValue({
        id: 'prod-1',
        title: 'Royal Maroon Zari Anarkali',
        slug: 'royal-maroon-zari-anarkali',
        categoryId: 'cat-1',
        reviews: [{ rating: 5 }],
      }),
    },
    category: {
      findUnique: jest.fn().mockResolvedValue({ id: 'cat-1', subcategories: [] }),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return paginated list of products with averageRating', async () => {
    const result = await service.findAll({ page: 1, limit: 12 });
    expect(result.data).toHaveLength(1);
    expect(result.data[0].averageRating).toBe(5.0);
    expect(result.total).toBe(1);
  });

  it('should find product details by slug along with similar products', async () => {
    const result = await service.findBySlug('royal-maroon-zari-anarkali');
    expect(result.title).toBe('Royal Maroon Zari Anarkali');
    expect(result.averageRating).toBe(5.0);
  });
});
