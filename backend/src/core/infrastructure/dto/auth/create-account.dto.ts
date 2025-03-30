import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';
import { AccountProvider } from '../../../domain/entities/impl/account.entity';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsEnum(AccountProvider)
  provider: AccountProvider;

  @IsString()
  providerId: string;

  @ValidateIf((o: CreateAccountDto) => o.provider === AccountProvider.EMAIL)
  @IsString()
  password?: string;
}
