import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  USER_REPOSITORY,
  UserRepository,
} from '../../../../infrastructure/repositories';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private readonly _userRepository: UserRepository,
  ) {}

  async execute(command: UpdateUserCommand) {
    const { userUpdateDto, userId, user } = command;

    if (!user.isAdmin() || !user.checkOwnership(userId)) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const userDb = await this._userRepository.update(userId, userUpdateDto);

    if (!userDb) {
      throw new HttpException(
        ErrorCodes.USER_NOT_FOUND,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
