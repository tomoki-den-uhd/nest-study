import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Users } from './users.model';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    return 'This is findAll';
  }

  @Post()
  create() {
    return 'This is create';
  }

  @Put()
  updateUser() {
    return 'This is updateUser';
  }

  @Delete()
  delete() {
    return 'This is delete';
  }
}
