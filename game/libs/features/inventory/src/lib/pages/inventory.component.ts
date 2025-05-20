import { Component, inject } from '@angular/core';
import { ItemComponent, TranslatePipe } from '@game/shared';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'game-inventory',
  imports: [TranslatePipe, ItemComponent],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  readonly #inventoryService = inject(InventoryService);

  protected readonly inventory = this.#inventoryService.inventory;
}
