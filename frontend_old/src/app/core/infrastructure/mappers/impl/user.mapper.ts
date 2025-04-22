import { UserBuilder } from '@game/builders';
import { UserDto } from '@game/dto';
import { User } from '@game/entities';

export const mapUserToEntity = (user: unknown): User => {
  const userData = user as UserDto;

  return new UserBuilder()
    .withId(userData.id)
    .withName(userData.name)

    .withRole(userData.role)
    .withLanguage(userData.language)

    .withCreatedAt(new Date(userData.createdAt))
    .withUpdatedAt(new Date(userData.updatedAt))

    .build();
};
