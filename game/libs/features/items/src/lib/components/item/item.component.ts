import { Component, computed, inject, input } from '@angular/core';
import { ItemEntity } from '@game/features/items';
import { SET_SERVICE, SetComponent } from '@game/features/sets';
import { TranslatePipe } from '@game/shared';

@Component({
  selector: 'lib-item',
  imports: [TranslatePipe, SetComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  readonly #setService = inject(SET_SERVICE);

  public readonly item = input.required<ItemEntity>();
  public readonly total = input<number>();

  protected readonly set = computed(() => {
    const setId = this.item().setId;

    if (!setId) {
      return undefined;
    }

    const sets = this.#setService.all.value();

    return sets.find((set) => set.id === setId);
  });

  protected showFooter = computed(() => {
    const total = this.total();

    return total !== undefined && total > 0;
  });
}
