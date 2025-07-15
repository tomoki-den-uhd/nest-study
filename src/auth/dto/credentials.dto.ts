import { IsNotEmpty, MaxLength, IsEmail, MinLength } from 'class-validator';
import { defaultIfEmpty } from 'rxjs';

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

  role;
}
