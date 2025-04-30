import { AccountProvider } from '../../../../domain/enums';

export type CreateAccountDataDto = {
  readonly userId: string;
  readonly provider: AccountProvider;
  readonly providerId: string;
  readonly email: string;

  password?: string;
  isPrimary?: boolean;
};
