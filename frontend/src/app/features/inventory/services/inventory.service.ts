import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  readonly #inventoryResource = httpResource('inventories/me', {});

  public readonly inventory = this.#inventoryResource.asReadonly();
}
