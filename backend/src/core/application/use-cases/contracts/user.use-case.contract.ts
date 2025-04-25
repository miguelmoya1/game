import { UserEntity } from '../../../domain/entities';
import { UpdateUserDto } from '../../../infrastructure/dto';

export interface UserUseCase {
  getById(userId: string): Promise<UserEntity | null>;
  update(
    updateUserDto: UpdateUserDto,
    userId: string,
    user: UserEntity,
  ): Promise<boolean>;
}

export const USER_USE_CASE = Symbol('USER_USE_CASE');
