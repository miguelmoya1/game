import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { getEmptyEffectForm } from '@game/features/effects';
import {
  ITEMS_SERVICE,
  ItemFormComponent,
  getEmptyItemForm,
} from '@game/features/items';
import { ButtonDirective, Rank, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-item-edit',
  imports: [TranslatePipe, ButtonDirective, ItemFormComponent],
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.css', './css/actions.css'],
})
export default class ItemEditComponent {
  readonly #itemService = inject(ITEMS_SERVICE);
  readonly #router = inject(Router);
  readonly #cdr = inject(ChangeDetectorRef);
  public readonly itemId = input.required<string>();

  readonly currentItem = computed(() => {
    const items = this.#itemService.all.value();

    return items.find((item) => item.id === this.itemId());
  });

  readonly itemForm = getEmptyItemForm();

  constructor() {
    effect(() => {
      const itemValue = this.currentItem();

      if (itemValue) {
        this.itemForm.patchValue({
          name: itemValue.name,
          description: itemValue.description ?? undefined,
          imageUrl: itemValue.imageUrl ?? undefined,
          itemType: itemValue.itemType,
          rank: itemValue.rank as Rank,
          spawnCategories: itemValue.spawnCategories,
          setId: itemValue.setId ?? undefined,
        });

        const effects = this.itemForm.get('effects') as FormArray;

        effects.clear();

        itemValue.effects?.forEach((effect) => {
          const formGroup = getEmptyEffectForm();

          formGroup.patchValue(effect);

          effects.push(formGroup);
        });

        this.#cdr.detectChanges();
      }
    });
  }

  protected async onSubmit() {
    if (!this.itemForm.valid) {
      console.error('Form is invalid');
      return;
    }
    const itemCreateDto = this.itemForm.getRawValue();

    await this.#itemService.update(this.itemId(), itemCreateDto);
    this.onClose();
  }

  protected onClose() {
    this.#router.navigate(['/admin']);
  }
}
