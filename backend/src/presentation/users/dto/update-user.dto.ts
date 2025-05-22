import { IsString, MaxLength, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsString({ message: 'MUST_BE_STRING' })
  @MinLength(3, { message: 'MIN_LENGTH_3' })
  @MaxLength(20, { message: 'MAX_LENGTH_20' })
  @IsOptional()
  readonly name?: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  readonly surname?: string;
}
