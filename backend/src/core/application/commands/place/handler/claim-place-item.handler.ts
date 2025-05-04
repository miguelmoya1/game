import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PlayerItemCollectionLogEntity } from '../../../../domain/entities';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLACE_REPOSITORY,
  PlaceRepository,
  PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
  PLAYER_ITEM_REPOSITORY,
  PLAYER_REPOSITORY,
  PlayerItemCollectionLogRepository,
  PlayerItemRepository,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { PERMISSIONS_SERVICE, PermissionsService } from '../../../services';
import { ClaimPlaceItemCommand } from '../impl/claim-place-item.command';

@CommandHandler(ClaimPlaceItemCommand)
export class ClaimPlaceItemHandler
  implements ICommandHandler<ClaimPlaceItemCommand>
{
  constructor(
    @Inject(PLACE_REPOSITORY)
    private readonly _placeRepository: PlaceRepository,
    @Inject(PLAYER_ITEM_COLLECTION_LOG_REPOSITORY)
    private readonly _playerItemCollectionLogRepository: PlayerItemCollectionLogRepository,
    @Inject(PLAYER_ITEM_REPOSITORY)
    private readonly _playerItemRepository: PlayerItemRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
    @Inject(PLAYER_REPOSITORY)
    private readonly _playerRepository: PlayerRepository,
  ) {}

  async execute(command: ClaimPlaceItemCommand) {
    const { placeId, user } = command;

    const place = await this._placeRepository.findById(placeId);

    if (!place) {
      throw new HttpException(ErrorCodes.PLACE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const playerItemCollectionLog =
      await this._playerItemCollectionLogRepository.getForPlace(placeId);

    const permissions = this._permissionsService.getPlacePermissions(
      place,
      playerItemCollectionLog,
      user,
    );

    if (!permissions.canBeClaimed) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const player = await this._playerRepository.getByUserId(user.id);

    if (!player) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    await this._playerItemRepository.add(player.id, place.currentItemId);

    await this._playerItemCollectionLogRepository.add({
      playerId: player.id,
      placeId: place.id,
      itemId: place.currentItemId,
      collectionMonthYear:
        PlayerItemCollectionLogEntity.formatToCollectionMonthYear(new Date()),
    });
  }
}
