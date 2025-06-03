import { StatsTarget } from '../../../../../core/src/lib/enums/stats-target.enum';
import { StatsType } from '../../../../../core/src/lib/enums/stats-type.enum';
import { EffectTarget } from '../enums/effect-target.enum';
import { EffectType } from '../enums/effect-type.enum';

export type Effect = {
  readonly value?: number | null;
  readonly type?: EffectType | null;
  readonly target?: EffectTarget | null;
  readonly stats?: StatsType | null;
  readonly statsTarget?: StatsTarget | null;
};
