import { StatsType } from '@game/shared';
import { EffectTarget } from '../enums/effect-target.enum';
import { EffectType } from '../enums/effect-type.enum';

export type Effect = {
  readonly type: EffectType;
  readonly target: EffectTarget;
  readonly value: number;

  readonly statType?: StatsType;
  readonly minimumItems?: number;
};
