import { UserBuilder } from '@game/builder';
import { User } from '@game/entities';

export const userToEntity = (user: User): User => {
  return new UserBuilder(user.id, user.createdAt, user.updatedAt, user.deletedAt)
    .withName(user.name)
    .withSurname(user.surname)
    .withNickname(user.nickname)
    .withLanguage(user.language)
    .withRole(user.role)
    .build();
};
