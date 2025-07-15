import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from '../../generated/prisma';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request as ExpressRequest } from 'express';
import { RequestUser } from 'src/types/requestUser';
import { Roles } from 'src/auth/guard/roles.decorators';
import { RolesGuard } from 'src/auth/guard/roles.gurad';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  //createはadmmin user問わず作成可能
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Product> {
    return await this.productsService.create(createProductDto, req.user.id);
  }

  //adminだけがすべての商品を検索可能
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('all')
  @Roles('admin')
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  //createUserIdでフィルタリングして商品検索
  @Get(':id')
  async findAllById(
    @Param('id', ParseIntPipe) id: number,
    @Body('createUserId', ParseIntPipe) createUserId: number,
  ): Promise<Product[]> {
    return await this.productsService.findAllById(id, createUserId);
  }

  //jwt認証でbear tokenが一致すれば商品のupdateが可能
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  //adminだけが商品を削除可能
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Delete(':id')
  @Roles('admin')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    return await this.productsService.delete(id);
  }
}
