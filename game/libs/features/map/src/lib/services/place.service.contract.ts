import { InjectionToken, Resource } from '@angular/core';
import { PlaceEntity, PlaceListEntity } from '@game/core';

export type PlaceService = {
  readonly list: Resource<PlaceListEntity[]>;
  readonly place: Resource<PlaceEntity | undefined>;
  setPlaceId: (id: string | undefined) => void;
  claim: () => Promise<void>;
};

export const PLACE_SERVICE = new InjectionToken<PlaceService>('PLACE_SERVICE');
