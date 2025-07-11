import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../generated/prisma';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post(':id')
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.productsService.delete(id);
  }
}

// POST /products: 新しい商品を作成します。リクエストボディに商品の情報とともに、createUserIdを含めてください。
// GET /products/:id: 指定したIDの商品を取得します。
// PUT /products/:id: 指定したIDの商品を更新します。
// DELETE /products/:id: 指定したIDの商品を削除します。
