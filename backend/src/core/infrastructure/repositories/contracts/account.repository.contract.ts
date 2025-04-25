import { AccountEntity } from '../../../domain/entities';
import { CreateAccountDto } from '../../dto';

type CreateParams = {
  readonly userId: string;
  readonly isPrimary?: boolean;
};

export interface AccountRepository {
  getOneByProviderEmail(email: string): Promise<AccountEntity | null>;
  getById(accountId: string): Promise<AccountEntity | null>;
  create(
    registerDto: CreateAccountDto,
    params: CreateParams,
  ): Promise<AccountEntity | null>;
  confirm(accountId: string): Promise<AccountEntity | null>;
  forgotPassword(email: string, hash: string): Promise<AccountEntity | null>;
  changePassword(
    accountId: string,
    password: string,
  ): Promise<AccountEntity | null>;
  findByHash(hashForPasswordReset: string): Promise<AccountEntity | null>;
}

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');
