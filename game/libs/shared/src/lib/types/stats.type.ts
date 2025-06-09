import { StatsTarget } from '../enums/stats-target.enum';
import { StatsType } from '../enums/stats-type.enum';

export type Stats = {
  readonly statsType: StatsType;
  readonly value: number;
  readonly statsTarget?: StatsTarget;
};
