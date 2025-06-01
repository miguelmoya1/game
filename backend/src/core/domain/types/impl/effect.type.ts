import { EffectTarget, EffectType, StatsTypes } from '../../enums';

export type Effect = {
  readonly type: EffectType;
  readonly target: EffectTarget;
  readonly value: number;

  readonly statType?: StatsTypes;
  readonly minimumItems?: number;
};
