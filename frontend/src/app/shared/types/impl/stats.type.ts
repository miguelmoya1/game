import { StatsTarget, StatsType } from '../../enums';

export type Stats = {
  readonly statsType: StatsType;
  readonly value: number;
  readonly statsTarget?: StatsTarget;
};
