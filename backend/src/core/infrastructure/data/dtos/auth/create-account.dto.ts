import type { AccountProvider } from '../../../../domain/entities/account.entity.ts';

export interface CreateAccountDto {
  email: string;
  provider: (typeof AccountProvider)[keyof typeof AccountProvider];
  providerId: string;
  password?: string;
}
