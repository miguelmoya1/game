import { SymbolRef } from '../../../di/di-manager.ts';
import type { CreateAccountDto } from '../../infrastructure/data/dtos/auth/create-account.dto.ts';
import type { CreateUserDto } from '../../infrastructure/data/dtos/user/create-user.dto.ts';
import { Account } from '../entities/account.entity.ts';
import { User } from '../entities/user.entity.ts';

export interface AccountUseCase {
  signInWithEmail(email: string, password: string): Promise<User>;
  create(createUserDto: CreateUserDto, createAccountDto: CreateAccountDto): Promise<User>;
  getById(id: string): Promise<Account>;
  confirm(accountId: string): Promise<User>;
  forgotPassword(email: string): Promise<Account>;
  changePassword(hashForPasswordReset: string, password: string): Promise<boolean>;
}

export const ACCOUNT_USE_CASE = new SymbolRef<AccountUseCase>(Symbol('ACCOUNT_USE_CASE'));
