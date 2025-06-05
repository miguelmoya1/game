import {
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { getEmptyEffectForm } from '@game/features/effects';
import {
  getEmptySetForm,
  SET_SERVICE,
  SetFormComponent,
} from '@game/features/sets';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-set-edit',
  imports: [TranslatePipe, SetFormComponent, ButtonDirective],
  templateUrl: './set-edit.component.html',
  styleUrls: ['./set-edit.component.css', './css/actions.css'],
})
export default class SetEditComponent {
  readonly #setsService = inject(SET_SERVICE);
  readonly #cdr = inject(ChangeDetectorRef);
  public readonly setId = input.required<string>();
  readonly #router = inject(Router);

  protected readonly setFormEdit = getEmptySetForm();
  protected readonly currentSet = computed(() => {
    const sets = this.#setsService.all.value();

    return sets.find((set) => set.id === this.setId());
  });

  constructor() {
    effect(() => {
      const setValue = this.currentSet();

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
    this.onClose();
  }

  protected onClose() {
    this.#router.navigate(['/admin']);
  }
}
