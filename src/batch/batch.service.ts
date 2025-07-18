import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as cron from 'node-cron';

@Injectable()
export class BatchService {
  private readonly logger = new Logger(BatchService.name);
  constructor(private readonly prismaService: PrismaService) {
    this.scheduleStockRefill();
  }

  scheduleStockRefill() {
    cron.schedule('*/10 * * * * *', async () => {
      const start = new Date();
      const refill = await this.prismaService.product.updateMany({
        data: { stock: 5 },
      });

      console.log(`商品在庫補充バッチ開始時刻: ${start}`);
      console.log(`処理実行件数:${Object.values(refill)}件`);

      const end = new Date();
      console.log(`商品在庫補充バッチ終了時刻: ${end}`);

      const noProduct = this.prismaService.product.findFirst();

      //エラーハンドリング

      //通知処理
    });
  }
}
