import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { SetFormComponent } from '../../components/set-form/set-form.component';
import { getEmptySetForm } from '../../helpers/set-form.helper';
import { SETS_SERVICE } from '../../services/sets.service.contract';

@Component({
  selector: 'game-create-set',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    ButtonDirective,
    SetFormComponent,
  ],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {
  readonly #setsService = inject(SETS_SERVICE);
  readonly #router = inject(Router);

  protected readonly setForm = getEmptySetForm();

  async onSubmit() {
    if (!this.setForm.valid) {
      this.setForm.markAllAsTouched();
      return;
    }

    const formData = this.setForm.getRawValue();

    await this.#setsService.create(formData);
    this.#router.navigate(['/admin']);
  }
}
