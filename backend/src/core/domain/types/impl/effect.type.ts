import { EffectType, StatsType, Target } from '../../enums';

export type Effect = {
  readonly value?: number;
  readonly type?: EffectType;
  readonly stats?: StatsType;
  readonly target?: Target;
  readonly minimumItems?: number;
};
