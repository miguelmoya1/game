import { Account, User } from '../../../domain/entities';
import { CreateAccountDto, CreateUserDto } from '../../../infrastructure/dto';

export interface AccountUseCase {
  signInWithEmail(email: string, password: string): Promise<string>;
  rehydrate(user: User): Promise<string>;
  create(
    createUserDto: CreateUserDto,
    createAccountDto: CreateAccountDto,
  ): Promise<string>;
  getById(id: string): Promise<Account>;
  confirm(accountId: string): Promise<string>;
  forgotPassword(email: string): Promise<Account>;
  changePassword(
    hashForPasswordReset: string,
    password: string,
  ): Promise<boolean>;
}

export const ACCOUNT_USE_CASE = Symbol('ACCOUNT_USE_CASE');
