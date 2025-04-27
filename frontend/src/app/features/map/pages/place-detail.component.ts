import { Component, effect, inject, input } from '@angular/core';
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
}
