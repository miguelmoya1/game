import { AccountEntity, UserEntity } from '../../../domain/entities';
import { CreateAccountDto, CreateUserDto } from '../../../infrastructure/dto';

export interface AccountUseCase {
  signInWithEmail(email: string, password: string): Promise<string>;
  rehydrate(user: UserEntity): Promise<string>;
  create(
    createUserDto: CreateUserDto,
    createAccountDto: CreateAccountDto,
  ): Promise<string>;
  getById(id: string): Promise<AccountEntity>;
  confirm(accountId: string): Promise<string>;
  forgotPassword(email: string): Promise<AccountEntity>;
  changePassword(
    hashForPasswordReset: string,
    password: string,
  ): Promise<boolean>;
}

export const ACCOUNT_USE_CASE = Symbol('ACCOUNT_USE_CASE');
