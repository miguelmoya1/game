import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { getEmptyEffectForm } from '@game/features/effects';

export const getEmptySetForm = () =>
  new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    description: new FormControl<string | undefined>(undefined, {
      nonNullable: true,
    }),
    effects: new FormArray<ReturnType<typeof getEmptyEffectForm>>([]),
  });
