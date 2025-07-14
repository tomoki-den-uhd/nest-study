import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { authUserDto } from './dto/auth-user.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UpdateProductDto } from 'src/products/dto/products.dto';
import { JwtService } from '@nestjs/jwt';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtPayload } from 'src/types/jwtPayload';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(credentialsDto: CredentialsDto): Promise<{ token: string }> {
    const { email, password } = credentialsDto;
    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const payloard: JwtPayload = {
        sub: user.id,
        userName: user.userName,
      };
      const token = this.jwtService.sign(payloard);
      return { token };
    }
    throw new UnauthorizedException();
  }

  //   async createNewUser(authUserDto: authUserDto) {
  //     const { name, userName, password } = authUserDto;
  //     return await this.usersService.create(authUserDto);
  //   }
}
