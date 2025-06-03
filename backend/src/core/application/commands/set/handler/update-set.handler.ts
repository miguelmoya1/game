import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  SET_REPOSITORY,
  SetRepository,
} from '../../../../infrastructure/repositories';
import { UpdateSetCommand } from '../impl/update-set.command';

@CommandHandler(UpdateSetCommand)
export class UpdateSetHandler implements ICommandHandler<UpdateSetCommand> {
  constructor(
    @Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository,
  ) {}

  async execute(command: UpdateSetCommand) {
    const { setId, updateSetDataDto, user } = command;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const set = await this._setRepository.update(setId, updateSetDataDto);

    if (!set) {
      throw new HttpException(ErrorCodes.SETS_NOT_FOUND, HttpStatus.NOT_FOUND);
    }
  }
}
