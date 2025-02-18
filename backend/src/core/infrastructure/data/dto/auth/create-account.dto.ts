import { AccountProvider } from '@game/entities';
import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsEnum(AccountProvider)
  provider: AccountProvider;

  @IsString()
  providerId: string;

  @ValidateIf((o) => o.provider === AccountProvider.EMAIL)
  @IsString()
  password?: string;
}
