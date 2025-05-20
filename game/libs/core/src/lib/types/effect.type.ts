import { EffectTarget } from '../enums/effect-target.enum';
import { EffectType } from '../enums/effect-type.enum';
import { StatsTarget } from '../enums/stats-target.enum';
import { StatsType } from '../enums/stats-type.enum';

export type Effect = {
  readonly value?: number | null;
  readonly type?: EffectType | null;
  readonly target?: EffectTarget | null;
  readonly stats?: StatsType | null;
  readonly statsTarget?: StatsTarget | null;
};
