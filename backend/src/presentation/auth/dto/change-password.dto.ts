import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordDto {
  @IsNotEmpty({ message: 'MUST_BE_NOT_EMPTY' })
  @IsString({ message: 'MUST_BE_STRING' })
  password: string;
}
