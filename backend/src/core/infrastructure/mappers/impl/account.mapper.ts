import { Account as AccountDb } from '@prisma/client';
import { AccountBuilder } from 'src/core/domain/builders/account.builder';
import { Account } from '../../../domain/entities/impl/account.entity';

export const accountToEntity = (account: AccountDb): Account => {
  return new AccountBuilder()
    .withId(account.id)
    .withUserId(account.userId)
    .withProvider(account.provider)
    .withProviderId(account.providerId)
    .withEmail(account.email)
    .withPassword(account.password || undefined)

    .withIsConfirmed(account.isConfirmed)
    .withIsPrimary(account.isPrimary)

    .withHashForPasswordReset(account.hashForPasswordReset)
    .withHashExpiredAt(account.hashExpiredAt)

    .withCreatedAt(account.createdAt)
    .withUpdatedAt(account.updatedAt)
    .withDeletedAt(account.deletedAt)
    .build();
};
