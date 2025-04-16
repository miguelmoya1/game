import { Component, effect, inject } from '@angular/core';
import { GeolocationService, MapService } from '@game/services';
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
  readonly #mapService = inject(MapService);
  readonly #geolocationService = inject(GeolocationService);

  constructor() {
    effect(() => {
      const pois = this.#placeUseCase.all.value();

      if (!pois) return;

      this.#mapService.poisToDisplay.set(pois);
    });

    effect(() => {
      const userPosition = this.#geolocationService.position();

      if (!userPosition) return;

      const userPositionCoordinates: [number, number] = [userPosition.coords.latitude, userPosition.coords.longitude];

      this.#mapService.playerPosition.set(userPositionCoordinates);
    });
  }
}
