import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  getEmptyItemForm,
  ItemFormComponent,
  ITEMS_SERVICE,
} from '@game/features/items';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-item-new',
  imports: [ItemFormComponent, TranslatePipe, ButtonDirective],
  templateUrl: './item-new.component.html',
  styleUrls: ['./item-new.component.css', './css/actions.css'],
})
export default class ItemNewComponent {
  readonly #router = inject(Router);

  readonly itemForm = getEmptyItemForm();
  readonly itemsService = inject(ITEMS_SERVICE);

  protected async onSubmit() {
    if (!this.itemForm.valid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const formData = this.itemForm.getRawValue();

    await this.itemsService.create(formData);
    this.onClose();
  }

  protected onClose() {
    this.#router.navigate(['/admin']);
  }
}
