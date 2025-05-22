import { AccountProvider } from '@prisma/client';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { CreateAccountDataDto } from '../../../core/application/commands';

export class RegisterDto {
  @IsString({ message: 'MUST_BE_STRING' })
  name: string;

  @IsOptional()
  @IsString({ message: 'MUST_BE_STRING' })
  surname?: string;

  @IsEmail(undefined, { message: 'MUST_BE_EMAIL' })
  email: string;

  @IsEnum(AccountProvider, { message: 'MUST_BE_ACCOUNT_PROVIDER' })
  provider: AccountProvider;

  @IsString({ message: 'MUST_BE_STRING' })
  providerId: string;

  @ValidateIf((o: CreateAccountDataDto) => o.provider === AccountProvider.EMAIL)
  @IsString({ message: 'MUST_BE_STRING' })
  password?: string;

  @Exclude()
  @IsEmpty({ message: 'MUST_BE_EMPTY' })
  userId: string;
}
