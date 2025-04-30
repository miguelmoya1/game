import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginWithEmailDto {
  @IsEmail(undefined, { message: 'MUST_BE_EMAIL' })
  @IsNotEmpty({ message: 'MUST_BE_NOT_EMPTY' })
  email: string;

  @IsNotEmpty({ message: 'MUST_BE_NOT_EMPTY' })
  @IsString({ message: 'MUST_BE_STRING' })
  password: string;
}
