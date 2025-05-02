import { StatsTarget, StatsType } from '../../enums';

export type Stats = {
  readonly satsType: StatsType;
  readonly value: number;
  readonly statsTarget?: StatsTarget;
};
