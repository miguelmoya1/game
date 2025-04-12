import { User as UserDb } from '@prisma/client';
import { UserBuilder } from '../../../domain/builders/impl/user.builder';
import { User } from '../../../domain/entities/impl/user.entity';

export const userToEntity = (user: UserDb): User => {
  return new UserBuilder()
    .withId(user.id)
    .withName(user.name)
    .withSurname(user.surname)
    .withNickname(user.nickname)
    .withLanguage(user.language)
    .withRole(user.role)
    .withCreatedAt(user.createdAt)
    .withUpdatedAt(user.updatedAt)
    .withDeletedAt(user.deletedAt)
    .build();
};
