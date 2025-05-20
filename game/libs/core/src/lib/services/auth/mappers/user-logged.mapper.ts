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
    (typeof dto['surname'] === 'string' || dto['surname'] === null) &&
    typeof dto['nickname'] === 'string' &&
    typeof dto['language'] === 'string' &&
    typeof dto['role'] === 'string' &&
    typeof dto['createdAt'] === 'string' &&
    !isNaN(Date.parse(dto['createdAt'])) &&
    typeof dto['updatedAt'] === 'string' &&
    !isNaN(Date.parse(dto['updatedAt'])) &&
    (dto['deletedAt'] === null ||
      (typeof dto['deletedAt'] === 'string' &&
        !isNaN(Date.parse(dto['deletedAt']))))
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
    nickname: user.nickname,
    role: user.role,
    language: user.language,
    createdAt: new Date(user.createdAt),
    updatedAt: new Date(user.updatedAt),
    deletedAt: user.deletedAt ? new Date(user.deletedAt) : null,
  });
};
