import { AggregatedStats } from '../../../../../core/application/services';
import { Player } from '../../../../domain/types';

export class PlayerResponseWithStatsDto {
  public readonly id: string;
  public readonly nickname: string | null;
  public readonly level: number;
  public readonly rank: string;
  public readonly experience: number;
  public readonly stats: any[];
  public readonly userId: string;
  public readonly raceId: string;
  public readonly aggregatedStats: AggregatedStats;

  private constructor(data: Player, aggregatedStats: AggregatedStats) {
    this.id = data.id;
    this.nickname = data.nickname;
    this.level = data.level;
    this.rank = data.rank;
    this.experience = data.experience;
    this.stats = data.stats;
    this.userId = data.userId;
    this.raceId = data.raceId;
    this.aggregatedStats = aggregatedStats;
  }

  public static create(data: Player, aggregatedStats: AggregatedStats) {
    return new PlayerResponseWithStatsDto(data, aggregatedStats);
  }
}
