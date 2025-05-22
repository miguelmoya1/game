import { Rank } from '../../enums';
import { Player, Stats } from '../../types';

export class PlayerEntity implements Player {
  public readonly id: string;
  public readonly nickname: string | null;
  public readonly level: number;
  public readonly rank: Rank;
  public readonly experience: number;
  public readonly stats: Stats[];
  public readonly userId: string;
  public readonly raceId: string;

  private constructor(playerItem: Player) {
    this.id = playerItem.id;
    this.nickname = playerItem.nickname ?? null;
    this.level = playerItem.level;
    this.rank = playerItem.rank;
    this.experience = playerItem.experience;
    this.stats = playerItem.stats;
    this.userId = playerItem.userId;
    this.raceId = playerItem.raceId;
  }

  public static create(playerItem: Player) {
    return new PlayerEntity(playerItem);
  }
}
