import { AccountProvider } from '../../../../domain/entities/account.entity.ts';

export interface CreateAccountDto {
  email: string;
  provider: AccountProvider;
  providerId: string;
  password?: string;
}
