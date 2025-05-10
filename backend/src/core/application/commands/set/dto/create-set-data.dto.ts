import { EffectType, StatsType, Target } from '../../../../domain/enums';

export type CreateSetDataDto = {
  name: string;
  description?: string;
  effects: {
    type?: EffectType;
    target?: Target;
    value?: number;
    stats?: StatsType;
    minimumItems?: number;
  }[];
};
