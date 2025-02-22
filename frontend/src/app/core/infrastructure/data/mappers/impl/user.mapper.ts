import { UserBuilder } from '@game/builders';
import { UserDto } from '@game/dto';
import { User } from '@game/entities';

export const mapUserToEntity = (user: UserDto): User => {
  return new UserBuilder()
    .withId(user.id)
    .withName(user.name)

    .withRole(user.role)
    .withLanguage(user.language)

    .withCreatedAt(new Date(user.createdAt))
    .withUpdatedAt(new Date(user.updatedAt))

    .build();
};
