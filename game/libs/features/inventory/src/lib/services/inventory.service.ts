import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InventoryService } from './inventory.service.contract';
import { mapInventoryArrayToEntityArray } from './mappers/inventory.mapper';

@Injectable({
  providedIn: 'root',
})
export class InventoryServiceImpl implements InventoryService {
  readonly #inventoryResource = httpResource('inventories/me', {
    defaultValue: [],
    parse: mapInventoryArrayToEntityArray,
  });

  public readonly inventory = this.#inventoryResource.asReadonly();
}
