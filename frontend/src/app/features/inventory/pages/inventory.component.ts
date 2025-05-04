import { Component, inject } from '@angular/core';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'game-inventory',
  imports: [],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent {
  readonly #inventoryService = inject(InventoryService);
}
