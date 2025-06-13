import {
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
  MAP_CORE_SERVICE,
  MAP_PLAYER_SERVICE,
  MAP_POINTS_SERVICE,
} from '@game/features/map';
import { POINTS_SERVICE } from '@game/features/points';
import { GEOLOCATION_SERVICE } from '@game/shared';
import { MapTopControlsComponent } from './components/map-top-controls/map-top-controls.component';
import { PartyVisualizationComponent } from './components/party-visualization/party-visualization.component';

@Component({
  selector: 'game-map',
  imports: [RouterOutlet, MapTopControlsComponent, PartyVisualizationComponent],
  templateUrl: './map.component.html',
})
export default class MapComponent {
  readonly #geolocationService = inject(GEOLOCATION_SERVICE);
  readonly #pointsService = inject(POINTS_SERVICE);
  readonly #router = inject(Router);

  readonly #mapCoreService = inject(MAP_CORE_SERVICE);
  readonly #mapPointsService = inject(MAP_POINTS_SERVICE);
  readonly #mapPlayerService = inject(MAP_PLAYER_SERVICE);

  protected readonly mapContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('map');

  constructor() {
    effect(() => {
      this.#mapCoreService.setMap(this.mapContainer().nativeElement);
    });

    effect(() => {
      const places = this.#pointsService.all.value();

      this.#mapPointsService.setPoints(places);
    });

    effect(() => {
      const position = this.#geolocationService.position();

      if (position) {
        this.#mapPlayerService.setPosition(position.coords);
        this.#mapCoreService.setCenter(position.coords);
      }
    });

    effect(() => {
      const marker = this.#mapPointsService.markerSelected();

      if (!marker?.point) {
        return;
      }

      this.#router.navigate(['map', marker.point.placeId]);
    });
  }
}
