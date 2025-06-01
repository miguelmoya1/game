import { Rank } from '../../enums';
import { Stats } from '../../types';

export abstract class Player {
  public readonly id: string;
  public readonly nickname: string | null;
  public readonly level: number;
  public readonly rank: Rank;
  public readonly experience: number;
  public readonly stats: Stats[];
  public readonly userId: string;
  public readonly raceId: string;

  protected constructor(player: Player) {
    this.id = player.id;
    this.nickname = player.nickname ?? null;
    this.level = player.level;
    this.rank = player.rank;
    this.experience = player.experience;
    this.stats = player.stats;
    this.userId = player.userId;
    this.raceId = player.raceId;
  }
}

export class PlayerEntity extends Player {
  public static create(player: Player) {
    return new PlayerEntity(player);
  }
}
