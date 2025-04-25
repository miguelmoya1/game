import { Component, effect, inject, input } from '@angular/core';
import { Router } from '@angular/router';
import { GameBorderDirective } from '@game/shared/directives/border.directive';
import { GameButtonDirective } from '@game/shared/directives/button.directive';
import { TranslatePipe } from '@game/shared/pipes/translate.pipe';
import { PlaceService } from '../services/place.service';

@Component({
  selector: 'game-place-detail',
  imports: [GameButtonDirective, GameBorderDirective, TranslatePipe],
  hostDirectives: [GameBorderDirective],
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
