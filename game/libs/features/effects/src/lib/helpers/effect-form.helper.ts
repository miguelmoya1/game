import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StatsType } from '@game/core';
import { EffectTarget } from '../enums/effect-target.enum';
import { EffectType } from '../enums/effect-type.enum';

export const getEmptyEffectForm = () =>
  new FormGroup({
    type: new FormControl<EffectType>(EffectType.Bonus, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    target: new FormControl<EffectTarget>(EffectTarget.Self, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    value: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.pattern(/^-?\d*\.?\d+$/)],
    }),
    statType: new FormControl<StatsType | undefined>(undefined, {
      nonNullable: true,
    }),
    minimumItems: new FormControl<number | undefined>(undefined, {
      nonNullable: true,
    }),
  });
