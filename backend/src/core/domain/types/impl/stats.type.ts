import { StatsTypes } from '../../enums';

export type Stats = {
  readonly statsType: StatsTypes;
  readonly value: number;
};
