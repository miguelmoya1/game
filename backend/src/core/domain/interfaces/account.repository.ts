import { SymbolRef } from '../../../di/di-manager.ts';
import type { CreateAccountDto } from '../../infrastructure/data/dtos/auth/create-account.dto.ts';
import { Account } from '../entities/account.entity.ts';

type CreateParams = {
  readonly userId: string;
  readonly isPrimary?: boolean;
};

export interface AccountRepository {
  getOneByProviderEmail(email: string): Promise<Account | null>;
  getById(accountId: string): Promise<Account | null>;
  create(registerDto: CreateAccountDto, params: CreateParams): Promise<Account | null>;
  confirm(accountId: string): Promise<Account | null>;
  forgotPassword(email: string, hash: string): Promise<Account | null>;
  changePassword(accountId: string, password: string): Promise<Account | null>;
  findByHash(hashForPasswordReset: string): Promise<Account | null>;
}

export const ACCOUNT_REPOSITORY = new SymbolRef<AccountRepository>(Symbol('ACCOUNT_REPOSITORY'));
