import { PlayerEntity, PlayerItemEntity } from '../../../domain/entities';
import { StatsType } from '../../../domain/enums';

export type AggregatedStatDetail = {
  base: number;
  byLevel: number;
  bySet: number;
  byParty: number;
  byGuild: number;
  total: number;
};

export type AggregatedStats = Record<StatsType, AggregatedStatDetail>;

export abstract class AggregatedStatsService {
  abstract calculate(
    player: PlayerEntity,
    playerInventory: PlayerItemEntity[],
  ): AggregatedStats;
}

export const AGGREGATED_STATS_SERVICE = Symbol('AGGREGATED_STATS_SERVICE');
