export interface Product {
  id: number;
  productName: string;
  description: string;
  price: number;
  stock: number;
  createUserId: number;
  createdAt: Date;
  updatedAt: Date;
}