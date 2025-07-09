import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return 'This is findAll';
    // return this.usersService.findAll();
  }

  @Post(':id')
  create(@Param('id') id: string) {
    return 'This is create';
  }

  @Put(':id')
  updateUser(@Param('id') id: string) {
    return 'This is updateUser';
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return 'This is delete';
  }
}
