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

  //findAllを使ってフィルタリング化する
  @Get()
  async findAllById(
    @Body('createUserId', ParseIntPipe) createUserId: number,
  ): Promise<Product[]> {
    return await this.productsService.findAllById(createUserId);
  }

  //下のコードfindAllByIdができたら消す
  // @Get(':id')
  // async findByUserId(
  //   @Param('id', ParseIntPipe) id: number,
  // ): Promise<Product[]> {
  //   return await this.productsService.findByUserId(id);
  // }

  @Put(':id')
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Body('createUserId', ParseIntPipe) createUserId: number,
  ) {
    return await this.productsService.delete(id, createUserId);
  }
}
