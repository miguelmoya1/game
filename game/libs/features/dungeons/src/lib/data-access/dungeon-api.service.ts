import { HttpResourceRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class DungeonApiService {
  public get(location?: Position) {
    if (
      !location ||
      !location.coords?.latitude ||
      !location.coords?.longitude
    ) {
      return undefined;
    }

    const route: HttpResourceRequest = {
      url: 'dungeons',
      params: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    };

    return route;
  }
}
