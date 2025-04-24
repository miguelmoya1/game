import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { MapCoreService } from '../services/map-core.service';
import { MapPlaceService } from '../services/map-place.service';
import { MapPlayerService } from '../services/map-player.service';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'game-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  readonly #geolocationService = inject(GeolocationService);
  readonly #placeService = inject(PlaceService);

  readonly #mapCoreService = inject(MapCoreService);
  readonly #mapPlaceService = inject(MapPlaceService);
  readonly #mapPlayerService = inject(MapPlayerService);

  protected readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('map');

  constructor() {
    effect(() => {
      this.#mapCoreService.setMap(this.mapContainer().nativeElement);
    });

    effect(() => {
      const places = this.#placeService.all.value();

      this.#mapPlaceService.addPlaces(places);
    });

    effect(() => {
      const position = this.#geolocationService.position();

      if (position) {
        this.#mapPlayerService.setPosition(position.coords);
        this.#mapCoreService.setCenter(position.coords);
      }
    });
  }
}
