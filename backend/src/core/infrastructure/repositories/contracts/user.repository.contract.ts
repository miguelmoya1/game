import { UserEntity } from '../../../domain/entities';
import { CreateUserDto, UpdateUserDto } from '../../dto';

export interface UserRepository {
  findById(id: string): Promise<UserEntity | null>;
  update(id: string, user: UpdateUserDto): Promise<UserEntity | null>;
  create(createUserDto: CreateUserDto): Promise<UserEntity | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
