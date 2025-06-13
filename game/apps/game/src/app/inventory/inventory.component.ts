import { Component, inject } from '@angular/core';
import { INVENTORY_SERVICE } from '@game/features/inventory';
import { ItemComponent, ITEMS_SERVICE } from '@game/features/items';
import { TitleComponent, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-inventory',
  imports: [TranslatePipe, ItemComponent, TitleComponent],
  templateUrl: './inventory.component.html',
})
export class InventoryComponent {
  readonly #inventoryService = inject(INVENTORY_SERVICE);
  readonly #itemService = inject(ITEMS_SERVICE);
  readonly #items = this.#itemService.all;

  protected readonly inventory = this.#inventoryService.inventory;

  protected getItemById(id: string) {
    const items = this.#items.value();

    return items.find((item) => item.id === id);
  }
}
