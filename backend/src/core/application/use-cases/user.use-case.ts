import { inject } from '../../../di/di-manager.ts';
import { User } from '../../domain/entities/user.entity.ts';
import { ErrorCodes } from '../../domain/enums/index.ts';
import { USER_REPOSITORY } from '../../domain/interfaces/user.repository.ts';
import type { UserUseCase } from '../../domain/use-cases/user.use-case.contract.ts';
import type { CreateUserDto } from '../../infrastructure/data/dtos/user/create-user.dto.ts';
import type { UpdateUserDto } from '../../infrastructure/data/dtos/user/update-user.dto.ts';

export class UserUseCaseImpl implements UserUseCase {
  readonly #userRepository = inject(USER_REPOSITORY);

  async create(createUserDto: CreateUserDto) {
    const user = await this.#userRepository.create(createUserDto);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_CREATED);
    }

    return user;
  }

  async getById(userId: string) {
    return await this.#userRepository.findById(userId);
  }

  async update(updateUserDto: UpdateUserDto, userId: string, user: User) {
    if (!user.isAdmin() && !user.checkOwnership(userId)) {
      throw new Error(ErrorCodes.UNAUTHORIZED);
    }

    const userDb = await this.#userRepository.update(userId, updateUserDto);

    if (!userDb) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    return !!userDb;
  }
}
