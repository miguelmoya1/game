import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { ItemComponent, ITEMS_SERVICE } from '@game/features/items';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { PLACE_SERVICE } from '../services/place.service.contract';

@Component({
  selector: 'lib-place-detail',
  imports: [ButtonDirective, TranslatePipe, ItemComponent],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.css',
})
export class PlaceDetailComponent {
  readonly #router = inject(Router);
  readonly #placeService = inject(PLACE_SERVICE);
  readonly #itemService = inject(ITEMS_SERVICE);

  readonly loading = signal(false);

  public readonly placeId = input.required<string>();
  protected readonly placeResource = this.#placeService.place;
  protected readonly item = computed(() => {
    const place = this.#placeService.place.value();

    if (!place) {
      return undefined;
    }

    const itemId = place.currentItemId;

    const items = this.#itemService.all.value();

    if (!itemId || !items) {
      return undefined;
    }

    return items.find((item) => item.id === itemId);
  });

  constructor() {
    effect(() => {
      this.#placeService.setPlaceId(this.placeId());
    });
  }

  protected close() {
    this.#placeService.setPlaceId(undefined);
    this.#router.navigate(['map']);
  }

  protected async claim() {
    const place = this.#placeService.place.value();

    if (!place) {
      return;
    }

    if (!place.permissions.canBeClaimed) {
      return;
    }

    this.loading.set(true);
    await this.#placeService.claim();
    this.loading.set(false);
  }
}
