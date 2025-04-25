import { AccountProvider } from '../../enums';

export type Account = {
  readonly id: string;
  readonly userId: string;
  readonly provider: AccountProvider;
  readonly providerId: string;
  readonly email: string;
  readonly password?: string;

  readonly isConfirmed: boolean;
  readonly isPrimary: boolean;

  readonly hashForPasswordReset: string | null;
  readonly hashExpiredAt: Date | null;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
