import {
  Component,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { Router } from '@angular/router';
import { DUNGEONS_SERVICE } from '@game/features/dungeons';
import { ItemComponent, ITEMS_SERVICE } from '@game/features/items';
import { PLACE_SERVICE } from '@game/features/places';
import { POINTS_SERVICE } from '@game/features/points';
import { ButtonDirective, TitleComponent, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-place-detail',
  imports: [ButtonDirective, TranslatePipe, ItemComponent, TitleComponent],
  templateUrl: './place-detail.component.html',
})
export default class PlaceDetailComponent {
  readonly #router = inject(Router);
  readonly #placeService = inject(PLACE_SERVICE);
  readonly #dungeonsService = inject(DUNGEONS_SERVICE);
  readonly #pointsService = inject(POINTS_SERVICE);
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
      this.#dungeonsService.setPlaceId(this.placeId());
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
    this.#pointsService.all.reload();
    this.loading.set(false);
  }
}
