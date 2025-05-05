import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLACE_REPOSITORY,
  PlaceRepository,
  PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
  PlayerItemCollectionLogRepository,
} from '../../../../infrastructure/repositories';
import { PERMISSIONS_SERVICE, PermissionsService } from '../../../services';
import { ItemResponseDto } from '../../item/dto/item-response.dto';
import { PlaceDetailResponseDto } from '../dto/place-detail-response.dto';
import { GetPlaceQuery } from '../impl/get-place.query';

@QueryHandler(GetPlaceQuery)
export class GetPlaceHandler implements IQueryHandler<GetPlaceQuery> {
  constructor(
    @Inject(PLACE_REPOSITORY)
    private readonly _placeRepository: PlaceRepository,
    @Inject(PLAYER_ITEM_COLLECTION_LOG_REPOSITORY)
    private readonly _playerItemCollectionLogRepository: PlayerItemCollectionLogRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
  ) {}

  async execute(query: GetPlaceQuery) {
    const { placeId, user } = query;

    const place = await this._placeRepository.findById(placeId);

    if (!place) {
      throw new HttpException(ErrorCodes.PLACE_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const playerItemCollectionLog =
      await this._playerItemCollectionLogRepository.getForPlaces([placeId]);

    const permissions = this._permissionsService.getPlacePermissions(
      place,
      playerItemCollectionLog,
      user,
    );

    const permissionsItem = this._permissionsService.getItemPermissions(user);

    if (!place.currentItem) {
      throw new HttpException(ErrorCodes.ITEM_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const itemResponse = ItemResponseDto.create(
      place.currentItem,
      permissionsItem,
    );

    return PlaceDetailResponseDto.create(place, permissions, itemResponse);
  }
}
