import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.model';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  create(
    @Body('id') id: number,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ): User {
    const user: User = {
      id,
      name,
      email,
      password,
    };
    return this.usersService.create(user);
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
