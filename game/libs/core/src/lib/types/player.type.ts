import { Stats } from './stats.type';

export type Player = {
  readonly id: string;
  readonly nickname: string | null;
  readonly level: number;
  readonly rank: string;
  readonly experience: number;
  readonly stats: Stats[];
  readonly userId: string;
  readonly raceId: string;
};
