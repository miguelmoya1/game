import { CreateUserDataDto } from '../../../../application/commands/auth/dto/create-user-data.dto';
import { UpdateUserDataDto } from '../../../../application/commands/user/dto/update-user-data.dto';
import { UserEntity } from '../../../../domain/entities';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, user: UpdateUserDataDto): Promise<UserEntity | null>;
  create(createUserDto: CreateUserDataDto): Promise<UserEntity | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
