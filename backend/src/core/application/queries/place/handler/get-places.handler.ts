import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLACE_API_HISTORY_REPOSITORY,
  PLACE_API_REPOSITORY,
  PLACE_REPOSITORY,
  PlaceApiHistoryRepository,
  PlaceApiRepository,
  PlaceRepository,
  PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
  PlayerItemCollectionLogRepository,
} from '../../../../infrastructure/repositories';
import {
  PERMISSIONS_SERVICE,
  PermissionsService,
} from '../../../services/permissions/permissions.service.contract';
import { PlaceListResponseDto } from '../dto/place-list-response.dto';
import { GetPlacesQuery } from '../impl/get-places.query';

@QueryHandler(GetPlacesQuery)
export class GetPlacesHandler implements IQueryHandler<GetPlacesQuery> {
  constructor(
    @Inject(PLACE_REPOSITORY)
    private readonly _placeRepository: PlaceRepository,
    @Inject(PLACE_API_REPOSITORY)
    private readonly _placeApiRepository: PlaceApiRepository,
    @Inject(PLACE_API_HISTORY_REPOSITORY)
    private readonly _placeApiHistoryRepository: PlaceApiHistoryRepository,
    @Inject(PLAYER_ITEM_COLLECTION_LOG_REPOSITORY)
    private readonly _playerItemCollectionLogRepository: PlayerItemCollectionLogRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
  ) {}

  async execute(query: GetPlacesQuery) {
    const { lat, lng, user } = query;

    if (!lat || !lng) {
      throw new HttpException(
        ErrorCodes.PLACE_MISSING_LAT_LNG,
        HttpStatus.BAD_REQUEST,
      );
    }

    const shouldRequestApi =
      await this._placeApiHistoryRepository.shouldRequestApi(lat, lng);

    if (shouldRequestApi) {
      await this._placeApiRepository.fetchAndStorePlacesFromOverpass(lat, lng);
      await this._placeApiHistoryRepository.create(lat, lng);
    }

    const places = await this._placeRepository.get(lat, lng);
    const playerItemCollectionLogs =
      await this._playerItemCollectionLogRepository.getForPlaces(
        places.map((place) => place.id),
      );
    return places.map((place) => {
      const permissions = this._permissionsService.getPlacePermissions(
        place,
        playerItemCollectionLogs,
        user,
      );

      return PlaceListResponseDto.create(place, permissions);
    });
  }
}
