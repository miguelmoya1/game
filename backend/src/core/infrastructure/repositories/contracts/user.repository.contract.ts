import { User } from '../../../domain/entities/impl/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../dto';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(id: string, user: UpdateUserDto): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User | null>;
}

export const USER_REPOSITORY = Symbol('USER_REPOSITORY');
