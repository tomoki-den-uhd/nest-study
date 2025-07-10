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
import { User } from '../../generated/prisma';
import { CreateUserDto, UpdateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.usersService.findById(id);
  }

  //mailの例外フィルター外れたので入れ直す
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  //   @Put(':id')
  //   updateUser(
  //     @Param('id', ParseIntPipe) id: number,
  //     @Body() updateUserDto: UpdateUserDto,
  //   ): User {
  //     return this.usersService.updateUser(updateUserDto);
  //   }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.usersService.delete(id);
  }
}
