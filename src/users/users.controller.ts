import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post(':id')
  create(@Param('id') id: string) {
    return this.usersService.create();
  }

  @Put(':id')
  updateUser(@Param('id') id: string) {
    return this.usersService.updateUser();
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.usersService.delete();
  }
}
