import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective } from '../../../../shared/directives';
import { ItemType, PlaceCategory, Rank } from '../../../../shared/enums';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ItemFormComponent } from '../../components/item-form/item-form.component';
import { ITEMS_SERVICE } from '../../services/items.service.contract';

@Component({
  selector: 'game-create-item',
  imports: [ItemFormComponent, TranslatePipe, ButtonDirective],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css',
})
export class CreateItemComponent {
  readonly #itemService = inject(ITEMS_SERVICE);
  readonly #router = inject(Router);

  readonly itemForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    description: new FormControl('', {
      nonNullable: true,
    }),
    itemType: new FormControl<ItemType>(ItemType.EQUIPPABLE, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    imageUrl: new FormControl('', {
      nonNullable: true,
    }),
    effects: new FormArray([]),
    rank: new FormControl<Rank | undefined>(undefined, {
      nonNullable: true,
    }),
    spawnCategories: new FormControl<PlaceCategory[]>([], {
      nonNullable: true,
    }),
    setId: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
  });

  protected async onSubmit() {
    if (!this.itemForm.valid) {
      console.error('Form is invalid');
      return;
    }
    const itemCreateDto = this.itemForm.getRawValue();

    await this.#itemService.create(itemCreateDto);
    this.#router.navigate(['admin']);
  }
}
