import { AccountProvider } from '@game/shared/enums';

export type RegisterDto = {
  readonly email: string;
  readonly provider: AccountProvider;
  readonly providerId: string;
  readonly password: string;
};
