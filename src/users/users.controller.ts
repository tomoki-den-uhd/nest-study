import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
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

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): User {
    return this.usersService.findById(id);
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
  updateUser(
    @Param('id', ParseIntPipe)
    @Body('id')
    id: number,
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
    return this.usersService.updateUser(user);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
