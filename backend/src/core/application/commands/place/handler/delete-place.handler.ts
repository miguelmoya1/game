import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import { PLACE_REPOSITORY, PlaceRepository } from '../../../../infrastructure/repositories';
import { DeletePlaceCommand } from '../impl/delete-place.command';

@CommandHandler(DeletePlaceCommand)
export class DeletePlaceHandler implements ICommandHandler<DeletePlaceCommand> {
  constructor(
    @Inject(PLACE_REPOSITORY)
    private readonly _placeRepository: PlaceRepository,
  ) {}

  async execute(command: DeletePlaceCommand) {
    const { placeId, user } = command;
    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }
    await this._placeRepository.delete(placeId);
    return { success: true };
  }
}
