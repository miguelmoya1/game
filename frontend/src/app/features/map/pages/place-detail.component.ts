import { Component, effect, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BorderDirective, ButtonDirective, InfoDirective } from '@game/shared/directives';
import { TranslatePipe } from '@game/shared/pipes/translate.pipe';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'game-place-detail',
  imports: [ButtonDirective, BorderDirective, TranslatePipe, InfoDirective],
  hostDirectives: [BorderDirective],
  templateUrl: './place-detail.component.html',
  styleUrl: './place-detail.component.css',
})
export class PlaceDetailComponent {
  readonly #placeService = inject(PlaceService);
  readonly #router = inject(Router);
  readonly loading = signal(false);

  public readonly placeId = input.required<string>();

  protected readonly placeResource = this.#placeService.place;

  constructor() {
    effect(() => {
      this.#placeService.setPlaceId(this.placeId());
    });
  }

  protected close() {
    this.#placeService.setPlaceId(null);
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
