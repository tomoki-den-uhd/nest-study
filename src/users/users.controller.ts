import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post('id')
  create() {
    return 'This is create';
  }

  @Put('id')
  updateUser() {
    return 'This is updateUser';
  }

  @Delete('id')
  delete() {
    return 'This is delete';
  }
}
