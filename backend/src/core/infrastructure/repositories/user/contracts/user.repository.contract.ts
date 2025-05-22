import { CreateUserDataDto } from '../../../../application/commands';
import { UserEntity } from '../../../../domain/entities';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  create(createUserDto: CreateUserDataDto): Promise<UserEntity | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
