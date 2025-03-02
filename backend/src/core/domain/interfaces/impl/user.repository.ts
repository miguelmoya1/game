import { CreateUserDto, UpdateUserDto } from '@game/data/dto';
import { User } from '@game/entities';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(id: string, user: UpdateUserDto): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
