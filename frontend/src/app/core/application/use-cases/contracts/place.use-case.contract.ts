import { InjectionToken, Resource } from '@angular/core';
import { Place } from '@game/entities';

export interface PlaceUseCase {
  readonly all: Resource<Place[] | undefined>;
}

export const PLACE_USE_CASE = new InjectionToken<PlaceUseCase>('PLACE_USE_CASE');
