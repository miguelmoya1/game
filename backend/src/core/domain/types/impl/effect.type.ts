import { EffectTarget, EffectType, StatsTarget, StatsType } from '../../enums';

export type Effect = {
  readonly value?: number;
  readonly type?: EffectType;
  readonly target?: EffectTarget;
  readonly stats?: StatsType;
  readonly statsTarget?: StatsTarget;
};
