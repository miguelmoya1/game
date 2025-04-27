import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../domain/entities';
import { ErrorCodes } from '../../../domain/enums';
import {
  PLACE_API_HISTORY_REPOSITORY,
  PLACE_API_REPOSITORY,
  PLACE_REPOSITORY,
  PlaceApiHistoryRepository,
  PlaceApiRepository,
  PlaceRepository,
  PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
  PlayerItemCollectionLogRepository,
} from '../../../infrastructure/repositories';
import {
  PERMISSIONS_SERVICE,
  PermissionsService,
} from '../../services/permissions/permissions.service.contract';
import { PlaceUseCase } from '../contracts/place.use-case.contract';
import { PlaceDetailResponseDto } from '../dtos/place-detail-response.dto';
import { PlaceListResponseDto } from '../dtos/place-list-response.dto';

@Injectable()
export class PlaceUseCaseImpl implements PlaceUseCase {
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

  async getAll(lat: number, lng: number, user: UserEntity) {
    if (!lat || !lng) {
      throw new Error(ErrorCodes.PLACE_MISSING_LAT_LNG);
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

  public async getById(placeId: string, user: UserEntity) {
    const place = await this._placeRepository.findById(placeId);

    if (!place) {
      throw new Error(ErrorCodes.PLACE_NOT_FOUND);
    }

    const playerItemCollectionLog =
      await this._playerItemCollectionLogRepository.getForPlaces([placeId]);

    const permissions = this._permissionsService.getPlacePermissions(
      place,
      playerItemCollectionLog,
      user,
    );

    const permissionsItem = this._permissionsService.getItemPermissions(user);

    return PlaceDetailResponseDto.create(place, permissions, permissionsItem);
  }
}
