import { PrismaService } from '../prisma/prisma.service';
import { Test } from '@nestjs/testing';
import { BatchService } from './batch.service';

const mockPrismaService = {
  product: { updateMany: jest.fn(), findFirstOrThrow: jest.fn() },
};

describe('バッチ処理テスト', () => {
  let prismaService: PrismaService;
  let batchService: BatchService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        BatchService,
        {
          provide: PrismaService,
          useValue: mockPrismaService,
        },
      ],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    batchService = module.get<BatchService>(BatchService);
  });

  describe('スケジューリングライブラリ', () => {
    it('正常値', async () => {
      const fakeProduct = {
        id: 1,
        productName: 'test',
        description: 'test-description',
        price: 300,
        stock: 3,
      };
      const countProduct = { count: 999 };

      (prismaService.product.findFirstOrThrow as jest.Mock).mockResolvedValue(
        fakeProduct,
      );
      (prismaService.product.updateMany as jest.Mock).mockResolvedValue(
        Object.values(countProduct),
      );
      const result = await batchService.refillStock();
      expect(result[0]).toEqual(999);
    });

    it('商品のがDBに登録されていなかった時', () => {
      const fakeProductNoInput = null;
      (prismaService.product.findFirstOrThrow as jest.Mock).mockRejectedValue(
        fakeProductNoInput,
      );

      expect(batchService.refillStock()).rejects.toThrow(
        new Error('商品がDBに設定されていません'),
      );
    });
  });
});
