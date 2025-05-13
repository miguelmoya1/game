import { ChangeDetectorRef, Component, effect, inject, input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective } from '../../../../shared/directives';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { SetFormComponent } from '../../components/set-form/set-form.component';
import { getEmptyEffectForm } from '../../helpers/effect-form.helper';
import { getEmptySetForm } from '../../helpers/set-form.helper';
import { SETS_SERVICE } from '../../services/sets.service.contract';

@Component({
  selector: 'game-edit-set',
  imports: [TranslatePipe, SetFormComponent, ButtonDirective],
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.css',
})
export class EditSetComponent {
  readonly #setsService = inject(SETS_SERVICE);
  readonly #cdr = inject(ChangeDetectorRef);
  public readonly setId = input.required<string>();
  readonly #router = inject(Router);

  protected readonly setFormEdit = getEmptySetForm();

  constructor() {
    effect((cleanup) => {
      const setId = this.setId();

      this.#setsService.currentSetId.set(setId);

      cleanup(() => {
        this.#setsService.currentSetId.set(null);
      });
    });

    effect(() => {
      const setValue = this.#setsService.currentSetResource.value();

      if (setValue) {
        this.setFormEdit.patchValue({
          name: setValue.name,
          description: setValue.description ?? undefined,
        });

        const effects = this.setFormEdit.get('effects') as FormArray;

        effects.clear();

        setValue.effects?.forEach((effect) => {
          const formGroup = getEmptyEffectForm();

          formGroup.patchValue(effect);

          effects.push(formGroup);
        });

        this.#cdr.detectChanges();
      }
    });
  }

  async onSubmit() {
    if (!this.setFormEdit.valid) {
      this.setFormEdit.markAllAsTouched();
      return;
    }

    const formData = this.setFormEdit.getRawValue();

    await this.#setsService.update(this.setId(), formData);
    this.#router.navigate(['/admin']);
  }
}
