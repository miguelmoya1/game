import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  DUNGEON_REPOSITORY,
  DungeonRepository,
  PLACE_API_HISTORY_REPOSITORY,
  PLACE_API_REPOSITORY,
  PLACE_REPOSITORY,
  PlaceApiHistoryRepository,
  PlaceApiRepository,
  PlaceRepository,
  PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
  PlayerItemCollectionLogRepository,
} from 'src/core/infrastructure/repositories';
import { ErrorCodes } from '../../../../domain/enums';
import { PERMISSIONS_SERVICE, PermissionsService } from '../../../services';
import { PointListResponseDto } from '../dto/point-list-response.dto';
import { GetPointsQuery } from '../impl/get-points.query';

@QueryHandler(GetPointsQuery)
export class GetPointsHandler implements IQueryHandler<GetPointsQuery> {
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
    @Inject(DUNGEON_REPOSITORY)
    private readonly _dungeonRepository: DungeonRepository,
  ) {}

  async execute(query: GetPointsQuery) {
    const { lat, lng, user } = query;

    if (!lat || !lng) {
      throw new HttpException(ErrorCodes.PLACE_MISSING_LAT_LNG, HttpStatus.BAD_REQUEST);
    }

    const shouldRequestApi = await this._placeApiHistoryRepository.shouldRequestApi(lat, lng);

    if (shouldRequestApi) {
      await this._placeApiRepository.fetchAndStorePlacesFromOverpass(lat, lng);
      await this._placeApiHistoryRepository.create(lat, lng);
    }

    const places = await this._placeRepository.get(lat, lng);
    const playerItemCollectionLogs = await this._playerItemCollectionLogRepository.getForPlaces(
      places.map((place) => place.id),
    );

    const placesIds = places.map((place) => place.id);
    const dungeons = await this._dungeonRepository.findByPlaceIds(placesIds);

    return places.map((place) => {
      const permissions = this._permissionsService.getPlacePermissions(place, playerItemCollectionLogs, user);

      const dungeon = dungeons.find((dungeon) => dungeon.placeId === place.id);

      return PointListResponseDto.create({
        placeId: place.id,
        lat: place.lat,
        lng: place.lng,
        hasDungeon: !!dungeon,
        placePermissions: permissions,
      });
    });
  }
}
