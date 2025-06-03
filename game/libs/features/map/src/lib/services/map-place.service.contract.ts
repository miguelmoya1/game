import { InjectionToken, WritableSignal } from '@angular/core';
import { PlaceList } from '@game/core';
import { Marker } from 'maplibre-gl';
import { MapPlaceServiceImpl } from './map-place.service';

export type Selected = {
  readonly marker: Marker | null;
  readonly place: PlaceList | null;
};

export abstract class MapPlaceService {
  abstract readonly markerSelected: WritableSignal<Selected | null>;
  abstract addPlaces(places: PlaceList[]): void;
}

export const MAP_PLACE_SERVICE = new InjectionToken<MapPlaceService>(
  'MAP_PLACE_SERVICE',
  {
    providedIn: 'root',
    factory: () => new MapPlaceServiceImpl(),
  },
);
