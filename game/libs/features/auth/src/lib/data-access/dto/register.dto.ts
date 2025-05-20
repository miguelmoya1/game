import { AccountProvider } from '@game/core';

export type RegisterDto = {
  readonly email: string;
  readonly provider: AccountProvider;
  readonly providerId: string;
  readonly password: string;
};
