import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { mapPlaceArrayToEntityArray } from '@game/mappers';
import { PlaceRepository } from '../contracts/place.repository.contract';

@Injectable()
export class PlaceRepositoryImpl implements PlaceRepository {
  readonly #coordinates = signal<{ lat: number; lng: number } | null>(null);

  public setCoordinates(lat: number, lng: number) {
    this.#coordinates.set({
      lat,
      lng,
    });
  }

  public readonly all = httpResource(
    () => {
      const coords = this.#coordinates();

      if (!coords) {
        return undefined;
      }

      return `places?lat=${coords.lat}&lng=${coords.lng}`;
    },
    { parse: mapPlaceArrayToEntityArray, defaultValue: [] },
  );
}
