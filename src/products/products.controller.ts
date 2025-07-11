import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../generated/prisma';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('id')
  create() {
    return 'This is Product create';
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Put('id')
  updateProduct() {
    return 'This is Product updateProduct';
  }

  @Delete('id')
  delete() {
    return 'This is Product delete';
  }
}

// POST /products: 新しい商品を作成します。リクエストボディに商品の情報とともに、createUserIdを含めてください。
// GET /products/:id: 指定したIDの商品を取得します。
// PUT /products/:id: 指定したIDの商品を更新します。
// DELETE /products/:id: 指定したIDの商品を削除します。
