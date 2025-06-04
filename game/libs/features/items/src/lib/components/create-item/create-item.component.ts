import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { getEmptyItemForm } from '../../helper/item-form.helper';
import { ITEMS_SERVICE } from '../../services/items.service.contract';
import { ItemFormComponent } from '../item-form/item-form.component';

@Component({
  selector: 'lib-create-item',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    ButtonDirective,
    ItemFormComponent,
  ],
  template: `
    <h2 class="title">{{ 'CREATE_NEW_ITEM' | translate }}</h2>

    <lib-item-form [itemForm]="itemForm" />

    <div class="actions">
      <button gameButton type="button" (click)="onClose()">
        {{ 'CLOSE' | translate }}
      </button>

      <button gameButton (click)="onSubmit()">
        {{ 'CREATE' | translate }}
      </button>
    </div>
  `,
  styleUrl: './create-item.component.css',
})
export class CreateItemComponent {
  readonly #router = inject(Router);

  readonly itemForm = getEmptyItemForm();
  readonly itemsService = inject(ITEMS_SERVICE);

  async onSubmit() {
    if (!this.itemForm.valid) {
      this.itemForm.markAllAsTouched();
      return;
    }

    const formData = this.itemForm.getRawValue();

    await this.itemsService.create(formData);
    this.onClose();
  }

  onClose() {
    this.#router.navigate(['/admin']);
  }
}
