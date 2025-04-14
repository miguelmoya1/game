import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { mapPlaceArrayToEntityArray } from '@game/mappers';
import { PlaceRepository } from '../contracts/place.repository.contract';

@Injectable()
export class PlaceRepositoryImpl implements PlaceRepository {
  readonly #coordinates = signal({
    lat: 0,
    lng: 0,
  });

  public setCoordinates(lat: number, lng: number) {
    this.#coordinates.set({
      lat,
      lng,
    });
  }

  public readonly all = httpResource(
    () => ({
      url: 'places',
      params: {
        lat: this.#coordinates()!.lat,
        lng: this.#coordinates()!.lng,
      },
    }),
    { parse: mapPlaceArrayToEntityArray, defaultValue: [] },
  );
}
