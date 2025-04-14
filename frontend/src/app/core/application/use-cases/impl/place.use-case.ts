import { effect, inject, Injectable } from '@angular/core';
import { PLACE_REPOSITORY } from '@game/repositories';
import { GeolocationService } from '../../services';
import { PlaceUseCase } from '../contracts/place.use-case.contract';

@Injectable({ providedIn: 'root' })
export class PlaceUseCaseImpl implements PlaceUseCase {
  readonly #placeRepository = inject(PLACE_REPOSITORY);

  readonly #geolocationService = inject(GeolocationService);

  public readonly all = this.#placeRepository.all.asReadonly();

  constructor() {
    console.log('Position:');
    effect(() => {
      const position = this.#geolocationService.position();

      if (!position) return;

      const { latitude, longitude } = position.coords;

      this.#placeRepository.setCoordinates(latitude, longitude);
    });
  }
}
