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
import { UnauthorizedException, NotFoundException } from '@nestjs/common';

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

  //ログインユーザが作成した商品検索
  @Get(':id')
  async findByProductId(
    @Param('id', ParseIntPipe) id: number,
    @Body('createUserId', ParseIntPipe) createUserId: number,
  ): Promise<Product> {
    return await this.productsService.findByProductId(id, createUserId);
  }

  //ログインユーザが作成した商品ならupdate可能
  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  //adminかログインユーザが作成した商品なら削除可能
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Body('createUserId', ParseIntPipe) createUserId: number,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    const product = await this.productsService.findById(id);

    if (!product) {
      throw new NotFoundException('商品が見つかりません');
    }

    if (req.user.role === 'admin') {
      return await this.productsService.delete(id, product.createUserId);
    }

    if (createUserId === req.user.id) {
      return await this.productsService.delete(id, req.user.id);
    }
    throw new UnauthorizedException('削除権限がありません');
  }
}
