import { InjectionToken, Resource } from '@angular/core';
import { PlaceListEntity } from '../entities/place-list.entity';
import { PlaceEntity } from '../entities/place.entity';
import { PlaceServiceImpl } from './place.service';

export type PlaceService = {
  readonly list: Resource<PlaceListEntity[]>;
  readonly place: Resource<PlaceEntity | undefined>;
  setPlaceId: (id: string | undefined) => void;
  claim: () => Promise<void>;
};

export const PLACE_SERVICE = new InjectionToken<PlaceService>('PLACE_SERVICE', {
  factory: () => new PlaceServiceImpl(),
});
