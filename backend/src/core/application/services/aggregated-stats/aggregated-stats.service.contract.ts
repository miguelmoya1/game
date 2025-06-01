import {
  ItemEntity,
  PlayerEntity,
  PlayerItemEntity,
  SetEntity,
} from '../../../domain/entities';
import { StatsTypes } from '../../../domain/enums';

export type AggregatedStatDetail = {
  base: number;
  byLevel: number;
  byItems: number;
  bySet: number;
  byPartySetsBonus: number;
  byGuild: number;
  total: number;
};

export type AggregatedStats = Record<StatsTypes, AggregatedStatDetail>;

export abstract class AggregatedStatsService {
  abstract calculate(
    player: PlayerEntity,
    partyInventory: PlayerItemEntity[],
    items: ItemEntity[],
    sets: SetEntity[],
  ): AggregatedStats;
}

export const AGGREGATED_STATS_SERVICE = Symbol('AGGREGATED_STATS_SERVICE');
