import { Component, effect, inject } from '@angular/core';
import { GeolocationService, MapCoreService, MapPlaceService, MapPlayerService } from '@game/services';
import { PLACE_USE_CASE } from '@game/use-cases';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-game',
  imports: [MapComponent],
  template: ` <app-map /> `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `,
})
export class GameComponent {
  readonly #placeUseCase = inject(PLACE_USE_CASE);
  readonly #mapCoreService = inject(MapCoreService);
  readonly #mapPlayerService = inject(MapPlayerService);
  readonly #mapPlaceService = inject(MapPlaceService);
  readonly #geolocationService = inject(GeolocationService);

  constructor() {
    effect(() => {
      const pois = this.#placeUseCase.all.value();

      if (!pois) return;

      this.#mapPlaceService.setMarkers(pois);
    });

    effect(() => {
      const userPosition = this.#geolocationService.position();

      if (!userPosition) return;

      const userPositionCoordinates: [number, number] = [userPosition.coords.longitude, userPosition.coords.latitude];

      this.#mapPlayerService.playerPosition.set(userPositionCoordinates);

      this.#mapCoreService.setCenter(userPositionCoordinates);
    });
  }
}
