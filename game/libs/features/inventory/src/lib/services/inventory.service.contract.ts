import { InjectionToken, Resource } from '@angular/core';
import { InventoryEntity } from '../entities/inventory.entity';
import { InventoryServiceImpl } from './inventory.service';

export interface InventoryService {
  readonly inventory: Resource<InventoryEntity[]>;
}

export const INVENTORY_SERVICE = new InjectionToken<InventoryService>(
  'INVENTORY_SERVICE',
  {
    providedIn: 'root',
    factory: () => new InventoryServiceImpl(),
  },
);
