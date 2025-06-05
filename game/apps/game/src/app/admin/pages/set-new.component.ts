import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  getEmptySetForm,
  SET_SERVICE,
  SetFormComponent,
} from '@game/features/sets';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-set-new',
  imports: [SetFormComponent, TranslatePipe, ButtonDirective],
  templateUrl: './set-new.component.html',
  styleUrls: ['./set-new.component.css', './css/actions.css'],
})
export default class SetNewComponent {
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

  protected onClose() {
    this.#router.navigate(['/admin']);
  }
}
