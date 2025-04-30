import { StatsType } from '../../enums/impl/stats-type.enum';

export type StatBonus = {
  readonly id: string;
  readonly type: StatsType;
  readonly value: number;
  readonly itemId: string | null;
  readonly setEffectId: string | null;
};
