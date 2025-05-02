import { PlayerEntity } from '../../../../domain/entities';
import { Stats } from '../../../../domain/types';

export class PlayerResponseDto {
  public readonly id: string;
  public readonly level: number;
  public readonly rank: string;
  public readonly experience: number;
  public readonly stats: Stats[];
  public readonly userId: string;
  public readonly raceId: string;

  private constructor(data: {
    id: string;
    level: number;
    rank: string;
    experience: number;
    stats: Stats[];
    userId: string;
    raceId: string;
  }) {
    this.id = data.id;
    this.level = data.level;
    this.rank = data.rank;
    this.experience = data.experience;
    this.stats = data.stats;
    this.userId = data.userId;
    this.raceId = data.raceId;
  }

  public static create(data: PlayerEntity) {
    return new PlayerResponseDto(data);
  }
}
