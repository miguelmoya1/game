import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonDirective } from '../../../../shared/directives';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ItemFormComponent } from '../../components/item-form/item-form.component';
import { getEmptyItemForm } from '../../helpers/item-form.helper';
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

  readonly itemForm = getEmptyItemForm();

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
