import { Options } from '@nestjs/common';
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  id: number;

  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class UpdateUserDto {
  id: number;

  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

//- nameは必須で、最大長は50文字とします。
// - emailは必須で、有効なメールアドレス形式でなければなりません。
// - passwordは必須で、最小長は6文字とします。
