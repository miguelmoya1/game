import { UserBuilder } from '../../../domain/builders/user.builder.ts';
import { User } from '../../../domain/entities/user.entity.ts';
import type { User_db } from '../../database/entities.ts';

export const userToEntity = (user: User_db): User => {
  return new UserBuilder()
    .withId(user.id)
    .withName(user.name)
    .withSurname(user.surname)
    .withNickname(user.nickname)
    .withLanguage(user.language)
    .withRole(user.role)

    .withCreatedAt(user.created_at)
    .withUpdatedAt(user.updated_at)
    .withDeletedAt(user.deleted_at)

    .build();
};
