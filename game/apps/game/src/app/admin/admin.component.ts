import { Component, computed, inject, signal } from '@angular/core';
import {
  CreateItemComponent,
  ItemEntity,
  ITEMS_SERVICE,
} from '@game/features/items';
import {
  CreateSetComponent,
  SET_SERVICE,
  SetEntity,
} from '@game/features/sets';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-admin',
  imports: [
    CreateSetComponent,
    CreateItemComponent,
    TranslatePipe,
    ButtonDirective,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export default class AdminComponent {
  private readonly itemsService = inject(ITEMS_SERVICE);
  private readonly setsService = inject(SET_SERVICE);

  search = signal('');
  sets = this.setsService.all;
  items = this.itemsService.all;
  showCreateSet = false;
  showCreateItem = false;

  filteredItems = computed(() => {
    const q = this.search().toLowerCase();
    const items: ItemEntity[] = this.items.value() ?? [];
    return items.filter(
      (item: ItemEntity) =>
        item.name.toLowerCase().includes(q) ||
        (item.description?.toLowerCase().includes(q) ?? false),
    );
  });

  getSetName(setId?: string | null): string {
    if (!setId) return '';
    const sets: SetEntity[] = this.sets.value() ?? [];
    const set = sets.find((s: SetEntity) => s.id === setId);
    return set ? set.name : '';
  }

  onSearchInput(ev: Event) {
    const value = (ev.target as HTMLInputElement).value;
    this.search.set(value);
  }
}
