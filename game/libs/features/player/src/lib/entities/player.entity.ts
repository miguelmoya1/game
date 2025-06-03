import { Stats, StatsType } from '@game/core';

export abstract class Player {
  public readonly id: string;
  public readonly nickname: string | null;
  public readonly level: number;
  public readonly rank: string;
  public readonly experience: number;
  public readonly stats: Stats[];
  public readonly userId: string;
  public readonly raceId: string;
  public readonly aggregatedStats?: Record<
    StatsType,
    {
      base: number;
      byLevel: number;
      bySet: number;
      byPartySetsBonus: number;
      byGuild: number;
      total: number;
    }
  >;

  protected constructor(player: Player) {
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
}

export class PlayerEntity extends Player {
  public static create(player: Player) {
    return new PlayerEntity(player);
  }
}
