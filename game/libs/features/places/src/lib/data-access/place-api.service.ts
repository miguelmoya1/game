import { HttpClient, HttpResourceRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceApiService {
  readonly #httpClient = inject(HttpClient);

  public prepareUrl(placeId?: string) {
    if (!placeId) {
      return undefined;
    }

    const route: HttpResourceRequest = {
      url: `places/${placeId}`,
    };

    return route;
  }

  public get(location?: Position) {
    if (
      !location ||
      !location.coords?.latitude ||
      !location.coords?.longitude
    ) {
      return undefined;
    }

    const route: HttpResourceRequest = {
      url: 'places',
      params: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    };

    return route;
  }

  async claim(placeId: string) {
    return firstValueFrom(
      this.#httpClient.post<void>(`places/${placeId}/claim`, {}),
    );
  }
}
