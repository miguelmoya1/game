import { Stats } from '../../../types/stats.type';
import { AggregatedStats } from '../../party/dto/party.dto';

export interface PlayerDto {
  readonly id: string;
  readonly level: number;
  readonly rank: string;
  readonly nickname: string | null;
  readonly experience: number;
  readonly stats: Stats[];
  readonly userId: string;
  readonly raceId: string;
  readonly aggregatedStats: AggregatedStats;
}
