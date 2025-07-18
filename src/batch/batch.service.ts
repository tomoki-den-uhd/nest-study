import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as cron from 'node-cron';

@Injectable()
export class BatchService {
  constructor(private readonly prismaService: PrismaService) {
    this.scheduleStockRefill();
  }

  async refillStock() {
    const start = new Date();
    try {
      await this.prismaService.product.findFirstOrThrow({});
      const refill = await this.prismaService.product.updateMany({
        data: { stock: 10 },
      });

      console.log(`商品在庫補充バッチ開始時刻: ${start}`);
      console.log(`処理実行件数:${Object.values(refill)}件`);

      const end = new Date();
      console.log(`商品在庫補充バッチ終了時刻: ${end}`);
      return refill;
    } catch (error) {
      throw new Error('商品がDBに設定されていません');
    }
  }

  scheduleStockRefill() {
    cron.schedule('*/5 * * * *', async () => {
      await this.refillStock();
    });
  }
}
