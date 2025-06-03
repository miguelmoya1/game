import {
  ChangeDetectorRef,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { getEmptySetForm } from '../../helpers/set-form.helper';
import { SetFormComponent } from '../set-form/set-form.component';

// TODO: fix this
@Component({
  selector: 'lib-edit-set',
  imports: [TranslatePipe, SetFormComponent, ButtonDirective],
  templateUrl: './edit-set.component.html',
  styleUrl: './edit-set.component.css',
})
export class EditSetComponent {
  public readonly setId = input.required<string>();

  // readonly #setsService = inject(SET_SERVICE);
  readonly #cdr = inject(ChangeDetectorRef);
  readonly #router = inject(Router);

  protected readonly setFormEdit = getEmptySetForm();

  constructor() {
    effect((cleanup) => {
      const setId = this.setId();

      // this.#setsService.set(setId);

      cleanup(() => {
        // this.#setsService.currentSetId.set(null);
      });
    });

    effect(() => {
      // const setValue = this.#setsService.currentSetResource.value();

      // if (setValue) {
      //   this.setFormEdit.patchValue({
      //     name: setValue.name,
      //     description: setValue.description ?? undefined,
      //   });

      const effects = this.setFormEdit.get('effects') as FormArray;

      effects.clear();

      // setValue.effects?.forEach((effect) => {
      //   const formGroup = getEmptyEffectForm();

      //   formGroup.patchValue(effect);

      //   effects.push(formGroup);
      // });

      this.#cdr.detectChanges();
      // }
    });
  }

  async onSubmit() {
    if (!this.setFormEdit.valid) {
      this.setFormEdit.markAllAsTouched();
      return;
    }

    const formData = this.setFormEdit.getRawValue();

    // await this.#setsService.update(this.setId(), formData);
    this.#router.navigate(['/admin']);
  }
}
