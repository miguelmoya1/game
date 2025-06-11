import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { PlaceApiService } from '../data-access/place-api.service';
import { mapPlaceToEntity } from './mappers/place.mapper';
import { PlaceService } from './place.service.contract';

@Injectable()
export class PlaceServiceImpl implements PlaceService {
  readonly #placeApiService = inject(PlaceApiService);
  readonly #placeSelected = signal<string | undefined>(undefined);

  readonly #place = httpResource(
    () => this.#placeApiService.prepareUrl(this.#placeSelected()),
    { parse: mapPlaceToEntity },
  );

  public readonly place = this.#place.asReadonly();

  public setPlaceId(id?: string) {
    this.#placeSelected.set(id);
  }

  public async claim() {
    const placeId = this.#placeSelected();

    if (!placeId) {
      return;
    }

    await this.#placeApiService.claim(placeId);

    this.#place.reload();
  }
}
