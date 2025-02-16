import { Provider } from '@game/entities';
import { IsEmail, IsEnum, IsString, ValidateIf } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  email: string;

  @IsEnum(Provider)
  provider: Provider;

  @IsString()
  providerId: string;

  @ValidateIf((o) => o.provider === Provider.EMAIL)
  @IsString()
  password?: string;
}
