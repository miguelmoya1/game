import { CreateAccountDataDto } from '../../../../application/commands/auth/dto/create-account-data.dto';
import { AccountEntity } from '../../../../domain/entities';

export interface AccountRepository {
  active(accountId: string): Promise<AccountEntity | null>;

  getOneByProviderEmail(email: string): Promise<AccountEntity | null>;
  getById(accountId: string): Promise<AccountEntity | null>;
  create(registerDto: CreateAccountDataDto): Promise<AccountEntity | null>;
  forgotPassword(email: string, hash: string): Promise<AccountEntity | null>;
  changePassword(accountId: string, password: string): Promise<AccountEntity | null>;
  findByHash(hashForPasswordReset: string): Promise<AccountEntity | null>;
}

export const ACCOUNT_REPOSITORY = Symbol('ACCOUNT_REPOSITORY');
