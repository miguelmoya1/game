import { InjectionToken, WritableSignal } from '@angular/core';
import { PlaceListEntity } from '@game/features/places';
import { Marker } from 'maplibre-gl';
import { MapPlaceServiceImpl } from './map-place.service';

export type Selected = {
  readonly marker: Marker | null;
  readonly place: PlaceListEntity | null;
};

export abstract class MapPlaceService {
  abstract readonly markerSelected: WritableSignal<Selected | null>;
  abstract addPlaces(places: PlaceListEntity[]): void;
}

export const MAP_PLACE_SERVICE = new InjectionToken<MapPlaceService>(
  'MAP_PLACE_SERVICE',
  {
    providedIn: 'root',
    factory: () => new MapPlaceServiceImpl(),
  },
);
