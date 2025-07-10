import { Module } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { UsersController } from 'src/users/users.controller';
import { ProductsController } from './products.controller';

@Module({
  controllers: [UsersController, ProductsController],
  providers: [UsersService],
})
export class ProductsModule {}
