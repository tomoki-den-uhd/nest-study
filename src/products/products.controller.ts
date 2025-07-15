import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Req,
  Request,
  UnauthorizedException,
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

  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Post()
  @Roles('admin')
  async create(
    @Body() createProductDto: CreateProductDto,
    @Request() req: ExpressRequest & { user: RequestUser },
  ): Promise<Product> {
    return await this.productsService.create(createProductDto, req.user.id);
  }

  @Get('all')
  async findAll(): Promise<Product[]> {
    return await this.productsService.findAll();
  }

  @Get(':id')
  async findAllById(
    @Param('id', ParseIntPipe) id: number,
    @Body('createUserId', ParseIntPipe) createUserId: number,
  ): Promise<Product[]> {
    return await this.productsService.findAllById(id, createUserId);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return await this.productsService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async delete(
    @Param('id', ParseIntPipe) id: number,
    @Body('createUserId', ParseIntPipe) createUserId: number,
    @Request() req: ExpressRequest & { user: RequestUser },
  ) {
    if (createUserId !== req.user.id) {
      throw new UnauthorizedException('ユーザIDが一致しません');
    }
    return await this.productsService.delete(id, req.user.id);
  }
}
