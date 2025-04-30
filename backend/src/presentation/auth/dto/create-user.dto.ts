import { IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'MUST_BE_STRING' })
  name: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  surname?: string;
}
