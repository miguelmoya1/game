import {
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GEOLOCATION_SERVICE } from '@game/core';
import {
  MAP_CORE_SERVICE,
  MAP_PLACE_SERVICE,
  MAP_PLAYER_SERVICE,
} from '@game/features/map';
import { PLACE_SERVICE } from '@game/features/places';
import { MapTopControlsComponent } from './components/map-top-controls/map-top-controls.component';
import { PartyVisualizationComponent } from './components/party-visualization/party-visualization.component';

@Component({
  selector: 'game-map',
  imports: [RouterOutlet, MapTopControlsComponent, PartyVisualizationComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export default class MapComponent {
  readonly #geolocationService = inject(GEOLOCATION_SERVICE);
  readonly #placeService = inject(PLACE_SERVICE);
  readonly #router = inject(Router);

  readonly #mapCoreService = inject(MAP_CORE_SERVICE);
  readonly #mapPlaceService = inject(MAP_PLACE_SERVICE);
  readonly #mapPlayerService = inject(MAP_PLAYER_SERVICE);

  protected readonly mapContainer =
    viewChild.required<ElementRef<HTMLDivElement>>('map');

  constructor() {
    effect(() => {
      this.#mapCoreService.setMap(this.mapContainer().nativeElement);
    });

    effect(() => {
      const places = this.#placeService.list.value();

      this.#mapPlaceService.addPlaces(places);
    });

    effect(() => {
      const position = this.#geolocationService.position();

      if (position) {
        this.#mapPlayerService.setPosition(position.coords);
        this.#mapCoreService.setCenter(position.coords);
      }
    });

    effect(() => {
      const marker = this.#mapPlaceService.markerSelected();

      if (!marker?.place) {
        return;
      }

      this.#router.navigate(['map', marker.place.id]);
    });
  }
}
