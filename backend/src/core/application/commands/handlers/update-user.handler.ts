import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { USER_USE_CASE, UserUseCase } from '../../use-cases';
import { UpdateUserCommand } from '../impl/update-user.command';

@CommandHandler(UpdateUserCommand)
export class UpdateUserHandler implements ICommandHandler<UpdateUserCommand> {
  constructor(
    @Inject(USER_USE_CASE) private readonly _userUseCase: UserUseCase,
  ) {}

  async execute(command: UpdateUserCommand) {
    const { userUpdateDto, userId, user } = command;

    return await this._userUseCase.update(userUpdateDto, userId, user);
  }
}
