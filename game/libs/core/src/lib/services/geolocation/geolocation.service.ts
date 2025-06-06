import { effect, Injectable, signal } from '@angular/core';
import { CallbackID, Geolocation, Position } from '@capacitor/geolocation';

import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { debounceTime } from 'rxjs';
import { GeolocationService } from './geolocation.service.contract';

@Injectable()
export class GeolocationServiceImpl implements GeolocationService {
  readonly #position = signal<Position | null>(null);
  readonly #watching = signal(false);
  readonly #watchId = signal<CallbackID | null>(null);
  readonly #debouncedPosition = toObservable(this.#position).pipe(
    debounceTime(1000),
  );

  public readonly watching = this.#watching.asReadonly();
  public readonly position = toSignal(this.#debouncedPosition, {
    initialValue: null,
  });

  constructor() {
    this.updateCurrentPosition();

    effect(() => {
      if (this.#watching()) {
        this.#watchPosition();
      } else {
        this.#clearWatchPosition();
      }
    });
  }

  public async updateCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();

    this.#position.set(position);

    // // TODO: DELETE THIS
    // this.#position.set({
    //   ...position,
    //   coords: {
    //     ...position.coords,
    //     latitude: 38.3963805,
    //     longitude: -0.5121485,
    //   },
    // });
  }

  public setWatching(watching: boolean) {
    this.#watching.set(watching);
  }

  async #watchPosition() {
    this.#clearWatchPosition();

    const watchId = await Geolocation.watchPosition(
      {
        enableHighAccuracy: true,
        maximumAge: 2000, // Allow caching for up to 2 seconds
      },
      (position, err) => {
        if (err) {
          console.error('Error watching position:', err);
          return;
        }
        this.#position.set(position);
      },
    );

    this.#watchId.set(watchId);
  }

  #clearWatchPosition() {
    const watchId = this.#watchId();

    if (watchId) {
      Geolocation.clearWatch({ id: watchId });
      this.#watchId.set(null);
    }
  }
}
