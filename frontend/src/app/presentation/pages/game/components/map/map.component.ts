import { Component, effect, ElementRef, inject, untracked, viewChild } from '@angular/core';
import { GeolocationService, MapService } from '@game/services';

@Component({
  selector: 'app-map',
  template: '<div #map class="map"></div>',
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }

      .map {
        width: 100%;
        height: 100%;
      }
    `,
  ],
})
export class MapComponent {
  readonly #mapService = inject(MapService);
  readonly #geolocationService = inject(GeolocationService);

  protected readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('map');

  constructor() {
    effect(() => {
      const position = untracked(() => this.#geolocationService.position());

      const coords = position?.coords
        ? ([position.coords.longitude, position.coords.latitude] as [number, number])
        : undefined;

      this.#mapService.prepareMap(this.mapContainer().nativeElement, coords);
    });

    effect(() => {
      const position = this.#geolocationService.position();
      const coords = position?.coords
        ? ([position.coords.longitude, position.coords.latitude] as [number, number])
        : undefined;

      if (!coords) return;

      this.#mapService.setCenter(coords);
    });
  }
}
