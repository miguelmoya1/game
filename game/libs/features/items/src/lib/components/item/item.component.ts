import { Component, computed, inject, input, model } from '@angular/core';
import { EffectComponent } from '@game/features/effects';
import { ItemEntity } from '@game/features/items';
import { SET_SERVICE, SetComponent } from '@game/features/sets';
import {
  ChipComponent,
  RankComponent,
  TextComponent,
  TitleComponent,
  TranslatePipe,
} from '@game/shared';

@Component({
  selector: 'lib-item',
  imports: [
    TranslatePipe,
    SetComponent,
    TitleComponent,
    RankComponent,
    TextComponent,
    ChipComponent,
    EffectComponent,
  ],
  templateUrl: './item.component.html',
  host: {
    class:
      'block w-full flex flex-col p-8 gap-4 border border-gray-600 rounded-lg max-w-xl',
  },
})
export class ItemComponent {
  readonly #setService = inject(SET_SERVICE);

  public readonly item = input.required<ItemEntity>();
  public readonly total = input<number>();
  public readonly showMore = model<boolean>(false);

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
