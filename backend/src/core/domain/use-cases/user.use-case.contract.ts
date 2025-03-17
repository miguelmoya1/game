import { SymbolRef } from '../../../di/di-manager.ts';
import type { UpdateUserDto } from '../../infrastructure/data/dtos/user/update-user.dto.ts';
import { User } from '../entities/user.entity.ts';

export interface UserUseCase {
  getById(userId: string): Promise<User | null>;
  update(updateUserDto: UpdateUserDto, userId: string, user: User): Promise<boolean>;
}

export const USER_USE_CASE = new SymbolRef<UserUseCase>(Symbol('USER_USE_CASE'));
