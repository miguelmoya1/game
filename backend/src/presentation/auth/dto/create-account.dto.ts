import { AccountProvider } from '@prisma/client';
import { Exclude } from 'class-transformer';
import { IsEmail, IsEmpty, IsEnum, IsString, ValidateIf } from 'class-validator';

export class CreateAccountDto {
  @IsEmail(undefined, { message: 'MUST_BE_EMAIL' })
  email: string;

  @IsEnum(AccountProvider, { message: 'MUST_BE_ACCOUNT_PROVIDER' })
  provider: AccountProvider;

  @IsString({ message: 'MUST_BE_STRING' })
  providerId: string;

  @ValidateIf((o: CreateAccountDto) => o.provider === AccountProvider.EMAIL)
  @IsString({ message: 'MUST_BE_STRING' })
  password?: string;

  @Exclude()
  @IsEmpty({ message: 'MUST_BE_EMPTY' })
  userId: string;
}
