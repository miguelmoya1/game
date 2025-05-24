import { Player } from '../types/player.type';
import { Stats } from '../types/stats.type';

export class PlayerEntity implements Player {
  public readonly id: string;
  public readonly nickname: string | null;
  public readonly level: number;
  public readonly rank: string;
  public readonly experience: number;
  public readonly stats: Stats[];
  public readonly userId: string;
  public readonly raceId: string;
  public readonly aggregatedStats?: Record<
    string,
    {
      base: number;
      byLevel: number;
      bySet: number;
      byParty: number;
      byGuild: number;
      total: number;
    }
  >;

  private constructor(player: Player) {
    this.id = player.id;
    this.nickname = player.nickname ?? null;
    this.level = player.level;
    this.rank = player.rank;
    this.experience = player.experience;
    this.stats = player.stats;
    this.userId = player.userId;
    this.raceId = player.raceId;
    this.aggregatedStats = player.aggregatedStats;
  }

  public static create(player: Player) {
    return new PlayerEntity(player);
  }
}
