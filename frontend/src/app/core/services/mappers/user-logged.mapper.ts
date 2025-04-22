import { User } from '@game/shared/models/user.entity';
import { UserDto } from '../dto/user.dto';

export const mapUserToEntity = (user: unknown) => {
  if (typeof user !== 'object' || user === null) {
    return null;
  }

  const userData = user as UserDto;

  return new User({
    id: userData.id,
    name: userData.name,
    surname: userData.surname,
    nickname: userData.nickname,
    role: userData.role,
    language: userData.language,
    createdAt: new Date(userData.createdAt),
    updatedAt: new Date(userData.updatedAt),
    deletedAt: userData.deletedAt ? new Date(userData.deletedAt) : null,
  });
};
