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

  async findAll(): Promise<Product[]> {
    return await this.prismaService.product.findMany();
  }

  async findById(id: number): Promise<Product> {
    const found = await this.prismaService.product.findUnique({
      where: {
        id,
      },
    });
    if (!found) {
      throw new NotFoundId(id);
    }
    return found;
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

  async delete(id: number) {
    return await this.prismaService.product.delete({
      where: { id },
    });
  }
}
