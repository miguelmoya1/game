import { AccountProvider } from '../../enums';
import { Account } from '../../types';

export class AccountEntity implements Account {
  public readonly id: string;
  public readonly userId: string;
  public readonly provider: AccountProvider;
  public readonly providerId: string;
  public readonly email: string;
  public readonly password?: string;

  public readonly isConfirmed: boolean;
  public readonly isPrimary: boolean;

  public readonly hashForPasswordReset: string | null;
  public readonly hashExpiredAt: Date | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  private constructor(account: Account) {
    this.id = account.id;
    this.userId = account.userId;
    this.provider = account.provider;
    this.providerId = account.providerId;
    this.email = account.email;
    this.password = account.password;

    this.isConfirmed = account.isConfirmed;
    this.isPrimary = account.isPrimary;

    this.hashForPasswordReset = account.hashForPasswordReset;
    this.hashExpiredAt = account.hashExpiredAt;

    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
    this.deletedAt = account.deletedAt;
  }

  public static create(account: Account) {
    return new AccountEntity(account);
  }
}
