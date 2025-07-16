export class CreateProductDto {
  id: number;

  productName: string;

  description: string;

  price: number;

  stock: number;

  createUserId: number;
}

export class UpdateProductDto {
  id: number;

  productName: string;

  description: string;

  price: number;

  stock: number;

  createUserId: number;
}
