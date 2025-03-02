import { AccountBuilder } from '@game/builder';
import { Account_db } from '@game/database';
import { Account } from '@game/entities';

export const accountToEntity = (account: Account_db): Account => {
  return new AccountBuilder()
    .withId(account.id)
    .withUserId(account.user_id)
    .withProvider(account.provider)
    .withProviderId(account.provider_id)
    .withEmail(account.email)

    .withIsConfirmed(account.is_confirmed)
    .withIsPrimary(account.is_primary)

    .withHashForPasswordReset(account.hash_for_password_reset)
    .withHashExpiredAt(account.hash_expired_at)

    .withCreatedAt(account.created_at)
    .withUpdatedAt(account.updated_at)
    .withDeletedAt(account.deleted_at)

    .build();
};
