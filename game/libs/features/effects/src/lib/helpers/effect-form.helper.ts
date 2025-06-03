import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EffectTarget, EffectType, StatsTarget, StatsType } from '@game/core';

export const getEmptyEffectForm = () =>
  new FormGroup({
    type: new FormControl<EffectType | null>(null),
    value: new FormControl<number | null>(null, {
      validators: [Validators.pattern(/^-?\d*\.?\d+$/)],
    }),
    target: new FormControl<EffectTarget | null>(null),
    stats: new FormControl<StatsType | null>(null),
    statsTarget: new FormControl<StatsTarget | null>(null),
    minimumItems: new FormControl<number | null>(0, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });
