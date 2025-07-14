import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { UpdateProductDto } from 'src/products/dto/products.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/types/jwtPayload';
import * as bcrypt from 'bcrypt';
import { EmailAlreadyExistsException } from 'src/users/users.exception';
import { User } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(credentialsDto: CredentialsDto): Promise<User> {
    const emailExists = await this.prismaService.user.findUnique({
      where: { email: credentialsDto.email },
    });
    if (emailExists) {
      throw new EmailAlreadyExistsException('credentialsDto.email');
    }
    const { userName, email, password } = credentialsDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.prismaService.user.create({
      data: {
        userName,
        email,
        password: hashedPassword,
      },
    });
  }

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
}
