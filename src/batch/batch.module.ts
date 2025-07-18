import { Module } from '@nestjs/common';
import { BatchService } from './batch.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [BatchService],
  imports: [PrismaModule],
})
export class BatchModule {}
