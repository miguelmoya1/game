import { UserBuilder } from '@game/builder';
import { User } from '@game/entities';

export const userToEntity = (user: User): User => {
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
