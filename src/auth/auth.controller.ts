import { Body, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dto/credentials.dto';
import { User } from 'generated/prisma';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async signUp(@Body() credentialsDto: CredentialsDto): Promise<User> {
    return await this.authService.signUp(credentialsDto);
  }

  @Post('login')
  async signIn(
    @Body() credentials: CredentialsDto,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentials);
  }
}
