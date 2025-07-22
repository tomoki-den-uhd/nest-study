import { Transform } from 'class-transformer';
import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';

export class CredentialsDto {
  @IsNotEmpty()
  @MaxLength(50)
  userName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @Transform(({ value }) => value ?? 'user')
  role: string;
}
