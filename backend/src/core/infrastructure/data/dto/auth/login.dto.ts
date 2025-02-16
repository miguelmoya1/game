import { IsEmail, IsNotEmpty } from 'class-validator';

export class AuthEmailLoginPayloadDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
