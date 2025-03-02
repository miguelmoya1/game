import { UserBuilder } from '@game/builder';
import { User_db } from '@game/database';
import { User } from '@game/entities';

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
