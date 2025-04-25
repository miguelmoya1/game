import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities';
import { ErrorCodes } from '../../../domain/enums';
import { CreateUserDto, UpdateUserDto } from '../../../infrastructure/dto';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../infrastructure/repositories';
import { UserUseCase } from '../contracts/user.use-case.contract';

@Injectable()
export class UserUseCaseImpl implements UserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly _userRepository: UserRepository,
  ) {}

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

  public async update(
    updateUserDto: UpdateUserDto,
    userId: string,
    user: UserEntity,
  ) {
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
