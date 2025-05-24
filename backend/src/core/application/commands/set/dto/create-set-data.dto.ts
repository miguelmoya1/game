import { EffectType, StatsType, Target } from '../../../../domain/enums';

export type CreateSetDataDto = {
  id?: string;
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
