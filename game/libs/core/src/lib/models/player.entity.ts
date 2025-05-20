import { Player } from '../types/player.type';
import { Stats } from '../types/stats.type';

export class PlayerEntity implements Player {
  public readonly id: string;
  public readonly level: number;
  public readonly rank: string;
  public readonly experience: number;
  public readonly stats: Stats[];
  public readonly userId: string;
  public readonly raceId: string;

  private constructor(player: Player) {
    this.id = player.id;
    this.level = player.level;
    this.rank = player.rank;
    this.experience = player.experience;
    this.stats = player.stats;
    this.userId = player.userId;
    this.raceId = player.raceId;
  }

  public static create(player: Player) {
    return new PlayerEntity(player);
  }
}
