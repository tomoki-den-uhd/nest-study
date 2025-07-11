export class CreateProductDto {
  id: number;

  userName: string;

  description: string;

  price: number;

  stock: number;

  createUserId: number;
}

// id (number, primary key)
// userName (string, unique)
// description (string)
// price (number)
// stock (number)
// createUserId (number, foreign key referencing User entity)
// createdAt (Date)
// updatedAt (Date)
export class UpdateProductDto {
  id: number;

  userName: string;

  description: string;

  price: number;

  stock: number;

  createUserId: number;
}
