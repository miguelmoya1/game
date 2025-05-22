import { UserEntity } from '../../../models/user.entity';
import { UserDto } from '../dto/user.dto';

const isUserDto = (obj: unknown): obj is UserDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['name'] === 'string' &&
    typeof dto['language'] === 'string' &&
    typeof dto['role'] === 'string'
  );
};

export const mapUserToEntity = (user: unknown) => {
  if (!isUserDto(user)) {
    throw new Error('Invalid user data');
  }

  return UserEntity.create({
    id: user.id,
    name: user.name,
    surname: user.surname,
    role: user.role,
    language: user.language,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
    deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
  });
};
