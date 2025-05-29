import { EffectTarget, EffectType, Stats } from '../../enums';

export type Effect = {
  readonly type: EffectType;
  readonly target: EffectTarget;
  readonly value: number;

  readonly stats?: Stats;
  readonly minimumItems?: number;
};
