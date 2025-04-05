import { User } from '../../../domain/entities';
import { UpdateUserDto } from '../../../infrastructure/dto';

export interface UserUseCase {
  getById(userId: string): Promise<User | null>;
  update(
    updateUserDto: UpdateUserDto,
    userId: string,
    user: User,
  ): Promise<boolean>;
}

export const USER_USE_CASE = Symbol('USER_USE_CASE');
