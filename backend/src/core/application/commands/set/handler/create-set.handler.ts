import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  SET_REPOSITORY,
  SetRepository,
} from '../../../../infrastructure/repositories';
import { CreateSetCommand } from '../impl/create-set.command';

@CommandHandler(CreateSetCommand)
export class CreateSetHandler implements ICommandHandler<CreateSetCommand> {
  constructor(
    @Inject(SET_REPOSITORY) private readonly _setRepository: SetRepository,
  ) {}

  async execute(command: CreateSetCommand) {
    const { createSetDataDto, user } = command;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const set = await this._setRepository.create(createSetDataDto);

    if (!set) {
      throw new HttpException(
        ErrorCodes.SET_NOT_CREATED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
