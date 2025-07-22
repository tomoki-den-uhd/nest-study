import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { BatchModule } from './batch/batch.module';

@Module({
  imports: [UsersModule, ProductsModule, PrismaModule, BatchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
