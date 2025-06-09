// db.ts
import { InjectionToken } from '@angular/core';
import Dexie, { Table } from 'dexie';

export class AppDB extends Dexie {
  readonly items!: Table<unknown, string>;
  readonly sets!: Table<unknown, string>;

  constructor() {
    super('game-db');

    this.version(1).stores({
      items: 'id',
      sets: 'id',
    });
  }
}

export const DB_REF = new InjectionToken<AppDB>('DB_REF', {
  providedIn: 'root',
  factory: () => new AppDB(),
});
