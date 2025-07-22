import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}