import { StatsType, Target } from '../../enums';

export type Stats = {
  readonly statsType: StatsType;
  readonly value: number;
  readonly target?: Target;
};
