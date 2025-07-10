export interface Product {
  id: number;
  userName: string;
  description: string;
  price: number;
  stock: number;
  createUserId: number;
  createAt: Date;
  updatedAt: Date;
}

//Productエンティティに書く内容
// id (number, primary key)
// userName (string, unique)
// description (string)
// price (number)
// stock (number)
// createUserId (number, foreign key referencing User entity)
// createdAt (Date)
// updatedAt (Date)
