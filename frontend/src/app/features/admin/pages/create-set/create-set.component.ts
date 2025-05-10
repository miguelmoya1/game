import { Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective } from '../../../../shared/directives';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { SetFormComponent } from '../../components/set-form/set-form.component';
import { SETS_SERVICE } from '../../services/sets.service.contract';

@Component({
  selector: 'game-create-set',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, ButtonDirective, SetFormComponent],
  templateUrl: './create-set.component.html',
  styleUrl: './create-set.component.css',
})
export class CreateSetComponent {
  readonly #setsService = inject(SETS_SERVICE);
  readonly #router = inject(Router);

  protected readonly setForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    effects: new FormArray([]),
  });

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
