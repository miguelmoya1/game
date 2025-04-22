import { InjectionToken, ResourceRef } from '@angular/core';
import { Place } from '@game/entities';

export interface PlaceRepository {
  readonly all: ResourceRef<Place[]>;

  setCoordinates(lat: number, lng: number): void;
}

export const PLACE_REPOSITORY = new InjectionToken<PlaceRepository>('PLACE_REPOSITORY');
