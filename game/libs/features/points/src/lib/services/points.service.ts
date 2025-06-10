import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PointsService {
  readonly #points = httpResource('points');

  readonly watchPlaceId = signal<string | null>(null);
}
