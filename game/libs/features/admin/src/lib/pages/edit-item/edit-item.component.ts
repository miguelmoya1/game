import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { Rank } from '@game/core';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { ItemFormComponent } from '../../components/item-form/item-form.component';
import { getEmptyEffectForm } from '../../helpers/effect-form.helper';
import { getEmptyItemForm } from '../../helpers/item-form.helper';
import { ITEMS_SERVICE } from '../../services/items.service.contract';

@Component({
  selector: 'game-edit-item',
  imports: [TranslatePipe, ItemFormComponent, ButtonDirective],
  templateUrl: './edit-item.component.html',
  styleUrl: './edit-item.component.css',
})
export class EditItemComponent {
  readonly #itemService = inject(ITEMS_SERVICE);
  readonly #router = inject(Router);
  readonly #cdr = inject(ChangeDetectorRef);
  public readonly itemId = input.required<string>();
  readonly itemResource = this.#itemService.itemResource;

  readonly itemForm = getEmptyItemForm();

  constructor() {
    effect((cleanup) => {
      const itemId = this.itemId();

      this.#itemService.currentItemId.set(itemId);

      cleanup(() => {
        this.#itemService.currentItemId.set(null);
      });
    });

    effect(() => {
      const itemValue = this.itemResource.value();

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
    this.#router.navigate(['admin']);
  }
}
