import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { SetFormComponent } from '../../components/set-form/set-form.component';
import { getEmptySetForm } from '../../helpers/set-form.helper';
import { SET_SERVICE } from '../../services';

@Component({
  selector: 'lib-create-set',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    ButtonDirective,
    SetFormComponent,
  ],
  template: `
    <h2 class="title">{{ 'CREATE_NEW_SET' | translate }}</h2>

    <lib-set-form [setForm]="setForm" />

    <div class="actions">
      <button gameButton type="button" (click)="onClose()">
        {{ 'CLOSE' | translate }}
      </button>
      <button
        gameButton
        type="submit"
        [disabled]="!setForm.valid"
        class="submit-button"
        (click)="onSubmit()"
      >
        {{ 'CREATE_SET' | translate }}
      </button>
    </div>
  `,
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {
  readonly #setService = inject(SET_SERVICE);
  readonly #router = inject(Router);

  protected readonly setForm = getEmptySetForm();

  async onSubmit() {
    if (!this.setForm.valid) {
      this.setForm.markAllAsTouched();
      return;
    }

    const formData = this.setForm.getRawValue();

    await this.#setService.create(formData);
    this.onClose();
  }

  onClose() {
    this.#router.navigate(['/admin']);
  }
}
