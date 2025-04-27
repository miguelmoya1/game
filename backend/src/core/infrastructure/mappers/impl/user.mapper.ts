import { User as UserDb } from '@prisma/client';
import { UserEntity } from '../../../domain/entities';

export const userToEntity = (user: UserDb) => {
  return UserEntity.create({
    id: user.id,
    name: user.name,
    surname: user.surname,
    nickname: user.nickname,
    role: user.role,
    language: user.language,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    deletedAt: user.deletedAt,
  });
};
