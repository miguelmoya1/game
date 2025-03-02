import { UpdateUserDto } from '@game/data/dto';
import { User } from '@game/entities';

export interface UserUseCase {
  getById(userId: string): Promise<User | null>;
  update(updateUserDto: UpdateUserDto, userId: string, user: User): Promise<boolean>;
}

export const USER_USE_CASE = Symbol('USER_USE_CASE');
