import { Stats } from '../../../domain/enums';

export type AggregatedStatDetail = {
  base: number;
  byLevel: number;
  bySet: number;
  byParty: number;
  byGuild: number;
  total: number;
};

export type AggregatedStats = Record<Stats, AggregatedStatDetail>;

// TODO: Use repository here
export abstract class AggregatedStatsService {
  abstract calculate(playerId: string): AggregatedStats;
}

export const AGGREGATED_STATS_SERVICE = Symbol('AGGREGATED_STATS_SERVICE');
