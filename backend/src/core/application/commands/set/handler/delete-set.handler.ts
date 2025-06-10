import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import { SET_REPOSITORY, SetRepository } from '../../../../infrastructure/repositories';
import { DeleteSetCommand } from '../impl/delete-set.command';

@CommandHandler(DeleteSetCommand)
export class DeleteSetHandler implements ICommandHandler<DeleteSetCommand> {
  constructor(@Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository) {}

  async execute(command: DeleteSetCommand) {
    const { setId, user } = command;
    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    await this._setRepository.delete(setId);
    return { success: true };
  }
}
