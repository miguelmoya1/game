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

  private constructor(place: Player) {
    this.id = place.id;
    this.level = place.level;
    this.rank = place.rank;
    this.experience = place.experience;
    this.stats = place.stats;
    this.userId = place.userId;
    this.raceId = place.raceId;
  }

  public static create(place: Player) {
    return new PlayerEntity(place);
  }
}
