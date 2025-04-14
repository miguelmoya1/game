import { effect, Injectable, signal } from '@angular/core';
import { CallbackID, Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  readonly #position = signal<Position | null>(null);
  readonly #watching = signal(false);
  readonly #watchId = signal<CallbackID | null>(null);

  public readonly position = this.#position.asReadonly();
  public readonly watching = this.#watching.asReadonly();

  constructor() {
    this.updateCurrentPosition();
    effect(() => {
      this.#watching() ? this.#watchPosition() : this.#clearWatchPosition();
    });

    effect(() => {
      console.log('Position changed:', this.#position()?.coords);
    });
  }

  public async updateCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.#position.set(position);
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
