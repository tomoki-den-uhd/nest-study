import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { authUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/users.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  //   async createNewUser(authUserDto: authUserDto) {
  //     const { name, userName, password } = authUserDto;
  //     return await this.usersService.create(authUserDto);
  //   }
}
