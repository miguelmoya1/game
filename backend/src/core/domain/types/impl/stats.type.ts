import { StatsType, Target } from '../../enums';

export type Stats = {
  readonly satsType: StatsType;
  readonly value: number;
  readonly target?: Target;
};
