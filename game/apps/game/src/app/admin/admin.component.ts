import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateService } from '@game/core';
import { ItemEntity, ITEMS_SERVICE } from '@game/features/items';
import { SET_SERVICE, SetEntity } from '@game/features/sets';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-admin',
  imports: [
    TranslatePipe,
    ButtonDirective,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css',
})
export default class AdminComponent {
  readonly #itemsService = inject(ITEMS_SERVICE);
  readonly #setsService = inject(SET_SERVICE);
  readonly #translateService = inject(TranslateService);

  protected readonly search = signal('');
  readonly #sets = this.#setsService.all;
  readonly #items = this.#itemsService.all;

  protected readonly filteredItems = computed(() => {
    const q = this.search().toLowerCase();
    const items: ItemEntity[] = this.#items.value() ?? [];
    return items.filter(
      (item: ItemEntity) =>
        (this.#translateService.instant(item.name).toLowerCase().includes(q) ||
          this.#translateService
            .instant(item.description ?? '')
            .toLowerCase()
            .includes(q) ||
          (item.setId &&
            this.#translateService
              .instant(this.getSetName(item.setId))
              .toLowerCase()
              .includes(q))) ??
        false,
    );
  });

  protected readonly filteredSets = computed(() => {
    const q = this.search().toLowerCase();
    const sets: SetEntity[] = this.#sets.value() ?? [];
    return sets.filter(
      (set: SetEntity) =>
        (this.#translateService.instant(set.name).toLowerCase().includes(q) ||
          this.#translateService
            .instant(set.description ?? '')
            .toLowerCase()
            .includes(q)) ??
        false,
    );
  });

  getSetName(setId?: string | null): string {
    if (!setId) return '';
    const sets: SetEntity[] = this.#sets.value() ?? [];
    const set = sets.find((s: SetEntity) => s.id === setId);
    return set ? set.name : '';
  }
}
