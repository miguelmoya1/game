import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { MapCoreService } from '@game/services';

@Component({
  selector: 'game-map',
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
  readonly #mapCoreService = inject(MapCoreService);

  protected readonly mapContainer = viewChild.required<ElementRef<HTMLDivElement>>('map');

  constructor() {
    effect(() => {
      this.#mapCoreService.setMap(this.mapContainer().nativeElement);
    });
  }
}
