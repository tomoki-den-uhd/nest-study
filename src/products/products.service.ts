import { Injectable } from '@nestjs/common';
import { Product } from './products.model';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  EmailAlreadyExistsException,
  NotFoundId,
} from 'src/users/users.exception';
import { CreateProductDto, UpdateProductDto } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prismaService: PrismaService) {}
  private products: Product[] = [];

  //ここにfindAllを使ってフィルタリング化するものをかく
  async findAllById(createUserId: number): Promise<Product[]> {
    return await this.prismaService.product.findMany({
      where: {
        createUserId,
      },
    });
  }

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { userName, description, price, stock, createUserId } =
      createProductDto;
    return await this.prismaService.product.create({
      data: {
        userName,
        description,
        price,
        stock,
        createUserId,
      },
    });
  }

  async updateProduct(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const { userName, description, price, stock, createUserId } =
      updateProductDto;

    // createUserIdでフィルタリングしてから更新
    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        id,
        createUserId,
      },
    });

    if (!existingProduct) {
      throw new NotFoundId(id);
    }

    return await this.prismaService.product.update({
      where: { id },
      data: {
        userName,
        description,
        price,
        stock,
        createUserId,
      },
    });
  }

  async delete(id: number, createUserId: number) {
    // createUserIdでフィルタリングしてから削除
    const existingProduct = await this.prismaService.product.findFirst({
      where: {
        id,
        createUserId,
      },
    });

    if (!existingProduct) {
      throw new NotFoundId(id);
    }

    return await this.prismaService.product.delete({
      where: { id },
    });
  }
}
