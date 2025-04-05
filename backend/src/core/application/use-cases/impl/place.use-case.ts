import { Inject, Injectable } from '@nestjs/common';
import {
  PLACE_API_HISTORY_REPOSITORY,
  PLACE_API_REPOSITORY,
  PLACE_REPOSITORY,
  PlaceApiHistoryRepository,
  PlaceApiRepository,
  PlaceRepository,
} from '../../../infrastructure/repositories';
import { PlaceUseCase } from '../contracts/place.use-case.contract';

@Injectable()
export class PlaceUseCaseImpl implements PlaceUseCase {
  constructor(
    @Inject(PLACE_REPOSITORY)
    private readonly _placeRepository: PlaceRepository,
    @Inject(PLACE_API_REPOSITORY)
    private readonly _placeApiRepository: PlaceApiRepository,
    @Inject(PLACE_API_HISTORY_REPOSITORY)
    private readonly _placeApiHistoryRepository: PlaceApiHistoryRepository,
  ) {}

  async getAll(lat: number, lng: number) {
    const shouldRequestApi =
      await this._placeApiHistoryRepository.shouldRequestApi(lat, lng);

    if (shouldRequestApi) {
      const places = await this._placeApiRepository.getPlaces(lat, lng);

      if (places && places.length > 0) {
        await this._placeRepository.createMany(
          places.map((place) => ({
            ...place,
            apiId: place.apiId.toString(),
          })),
        );
      }

      await this._placeApiHistoryRepository.create(lat, lng);
    }

    return this._placeRepository.get(lat, lng);
  }

  public async getById(placeId: string) {
    return await this._placeRepository.findById(placeId);
  }
}
