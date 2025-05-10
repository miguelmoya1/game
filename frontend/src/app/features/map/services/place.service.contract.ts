import { InjectionToken, Resource } from '@angular/core';
import { PlaceEntity, PlaceListEntity } from '../../../shared/models';

export type PlaceService = {
  readonly list: Resource<PlaceListEntity[]>;
  readonly place: Resource<PlaceEntity | undefined>;
  setPlaceId: (id: string | null) => void;
  claim: () => Promise<void>;
};

export const PLACE_SERVICE = new InjectionToken<PlaceService>('PLACE_SERVICE');
