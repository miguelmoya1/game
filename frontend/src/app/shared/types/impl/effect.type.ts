import { EffectTarget, EffectType, StatsTarget, StatsType } from '../../enums';

export type Effect = {
  readonly value?: number | null;
  readonly type?: EffectType | null;
  readonly target?: EffectTarget | null;
  readonly stats?: StatsType | null;
  readonly statsTarget?: StatsTarget | null;
};
