import { SymbolRef } from '../../../di/di-manager.ts';
import type { CreateUserDto } from '../../infrastructure/data/dtos/user/create-user.dto.ts';
import type { UpdateUserDto } from '../../infrastructure/data/dtos/user/update-user.dto.ts';
import { User } from '../entities/user.entity.ts';

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  update(id: string, user: UpdateUserDto): Promise<User | null>;
  create(createUserDto: CreateUserDto): Promise<User | null>;
}

export const USER_REPOSITORY = new SymbolRef<UserRepository>(Symbol('USER_REPOSITORY'));
