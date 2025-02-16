import { CreateUserDto, UpdateUserDto } from '@game/data/dto';
import { User } from '@game/entities';
import { ErrorCodes } from '@game/enums';
import { USER_REPOSITORY, UserRepository } from '@game/interfaces';
import { UserUseCase } from '@game/use-cases-contracts';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class UserUseCaseImpl implements UserUseCase {
  constructor(@Inject(USER_REPOSITORY) private readonly _userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this._userRepository.create(createUserDto);

    if (!user) {
      throw new Error(ErrorCodes.USER_NOT_CREATED);
    }

    return user;
  }

  public async getById(userId: string) {
    return await this._userRepository.findById(userId);
  }

  public async update(updateUserDto: UpdateUserDto, userId: string, user: User) {
    if (!user.isAdmin() || !user.checkOwnership(userId)) {
      throw new Error(ErrorCodes.UNAUTHORIZED);
    }

    const userDb = await this._userRepository.update(userId, updateUserDto);

    if (!userDb) {
      throw new Error(ErrorCodes.USER_NOT_FOUND);
    }

    return !!userDb;
  }
}
