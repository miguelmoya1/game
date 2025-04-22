export enum AccountProvider {
  EMAIL = 'EMAIL',
  // GOOGLE = 'GOOGLE',
}

export type RegisterDto = {
  readonly email: string;
  readonly provider: AccountProvider;
  readonly providerId: string;
  readonly password: string;
};
