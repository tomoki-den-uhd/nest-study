import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post('id')
  create() {
    return 'This is Product create';
  }

  @Get('id')
  findAll() {
    return 'This is Product find All';
  }

  @Put('id')
  updateProduct() {
    return 'This is Product updateProduct';
  }

  @Delete('id')
  delete() {
    return 'This is Product delete';
  }
}

// POST /products: 新しい商品を作成します。リクエストボディに商品の情報とともに、createUserIdを含めてください。
// GET /products/:id: 指定したIDの商品を取得します。
// PUT /products/:id: 指定したIDの商品を更新します。
// DELETE /products/:id: 指定したIDの商品を削除します。
