import {
  Component,
  effect,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GEOLOCATION_SERVICE } from '@game/core';
import { MapTopControlsComponent } from '../components/map-top-controls/map-top-controls.component';
import { PartyVisualizationComponent } from '../components/party-visualization/party-visualization.component';
import { MapCoreService } from '../services/map-core.service';
import { MapPlaceService } from '../services/map-place.service';
import { MapPlayerService } from '../services/map-player.service';
import { PLACE_SERVICE } from '../services/place.service.contract';

@Component({
  selector: 'game-map',
  imports: [RouterOutlet, MapTopControlsComponent, PartyVisualizationComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  readonly #geolocationService = inject(GEOLOCATION_SERVICE);
  readonly #placeService = inject(PLACE_SERVICE);
  readonly #router = inject(Router);

  readonly #mapCoreService = inject(MapCoreService);
  readonly #mapPlaceService = inject(MapPlaceService);
  readonly #mapPlayerService = inject(MapPlayerService);

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
