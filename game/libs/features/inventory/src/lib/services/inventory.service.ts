import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapInventoryArrayToEntityArray } from './mappers/inventory.mapper';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  readonly #inventoryResource = httpResource('inventories/me', {
    parse: mapInventoryArrayToEntityArray,
  });

  public readonly inventory = this.#inventoryResource.asReadonly();
}
