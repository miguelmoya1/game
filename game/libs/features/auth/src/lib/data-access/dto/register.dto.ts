import { AccountProvider } from '../../enums/auth.enums';

export type RegisterDto = {
  readonly name: string;
  readonly email: string;
  readonly provider: AccountProvider;
  readonly providerId: string;
  readonly password: string;
};
