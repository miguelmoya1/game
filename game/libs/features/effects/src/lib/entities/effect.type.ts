import { StatsType } from '@game/core';
import { EffectTarget } from '../enums/effect-target.enum';
import { EffectType } from '../enums/effect-type.enum';

export type Effect = {
  readonly type: EffectType;
  readonly target: EffectTarget;
  readonly value: number;

  readonly statType?: StatsType;
  readonly minimumItems?: number;
};
