import { EffectTarget, EffectType, StatsTypes } from '../../../../domain/enums';

export type CreateSetDataDto = {
  id?: string;
  name: string;
  description: string;
  effects: {
    type: EffectType;
    target: EffectTarget;
    value: number;
    statType?: StatsTypes;
    minimumItems?: number;
  }[];
};
