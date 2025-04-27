import { Account as AccountDb } from '@prisma/client';
import { AccountEntity } from '../../../domain/entities';

export const accountToEntity = (account: AccountDb) => {
  return AccountEntity.create({
    id: account.id,
    userId: account.userId,
    provider: account.provider,
    providerId: account.providerId,
    email: account.email,
    password: account.password || undefined,
    isConfirmed: account.isConfirmed,
    isPrimary: account.isPrimary,
    hashForPasswordReset: account.hashForPasswordReset,
    hashExpiredAt: account.hashExpiredAt,
    createdAt: account.createdAt,
    updatedAt: account.updatedAt,
    deletedAt: account.deletedAt,
  });
};
