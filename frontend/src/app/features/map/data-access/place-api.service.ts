import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceApiService {
  readonly #httpClient = inject(HttpClient);

  async claim(placeId: string) {
    return firstValueFrom(this.#httpClient.post<void>(`places/${placeId}/claim`, {}));
  }
}
