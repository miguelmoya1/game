import { Stats } from '@game/core';

export interface PlayerDto {
  id: string;
  level: number;
  rank: string;
  experience: number;
  stats: Stats[];
  userId: string;
  raceId: string;
  name?: string;
}
