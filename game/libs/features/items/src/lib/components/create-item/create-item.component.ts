import { Component, inject, output } from '@angular/core';
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
    <form [formGroup]="itemForm" (ngSubmit)="onSubmit()">
      <lib-item-form [itemForm]="itemForm" />
      <div class="create-item-actions">
        <button gameButton type="submit">
          {{ 'CREATE' | translate }}
        </button>
        <button gameButton type="button" (click)="closed.emit()">
          {{ 'CLOSE' | translate }}
        </button>
      </div>
    </form>
  `,
  styleUrl: './create-item.component.css',
})
export class CreateItemComponent {
  public readonly closed = output<void>();

  readonly itemForm = getEmptyItemForm();
  readonly itemsService = inject(ITEMS_SERVICE);
  readonly router = inject(Router);

  async onSubmit() {
    if (!this.itemForm.valid) {
      this.itemForm.markAllAsTouched();
      return;
    }
    const formData = this.itemForm.getRawValue();
    await this.itemsService.create(formData);
    this.closed.emit();
  }
}
