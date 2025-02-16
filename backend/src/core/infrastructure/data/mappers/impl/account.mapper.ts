import { AccountBuilder } from '@game/builder';
import { Account } from '@game/entities';

export const accountToEntity = (account: Account): Account => {
  return new AccountBuilder()
    .withId(account.id)
    .withUserId(account.userId)
    .withProvider(account.provider)
    .withProviderId(account.providerId)
    .withEmail(account.email)
    .withPassword(account.password)

    .withIsConfirmed(account.isConfirmed)
    .withIsPrimary(account.isPrimary)

    .withHashForPasswordReset(account.hashForPasswordReset)
    .withHashExpiredAt(account.hashExpiredAt)
    .build();
};
