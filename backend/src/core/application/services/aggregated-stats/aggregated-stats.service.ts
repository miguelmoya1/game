import { Injectable } from '@nestjs/common';
import { PlayerEntity, PlayerItemEntity } from 'src/core/domain/entities';
import { Effect } from '../../../../core/domain/types';
import { StatsType, Target } from '../../../domain/enums';
import { AggregatedStatsService } from './aggregated-stats.service.contract';

export type AggregatedStatDetail = {
  base: number;
  byLevel: number;
  bySet: number;
  byParty: number;
  byGuild: number;
  total: number;
};

export type AggregatedStats = Record<StatsType, AggregatedStatDetail>;

@Injectable()
export class AggregatedStatsServiceImpl extends AggregatedStatsService {
  public calculate(player: PlayerEntity, partyInventory: PlayerItemEntity[]) {
    const stats: AggregatedStats = {} as AggregatedStats;

    const playerInventory =
      partyInventory.filter((item) => item.playerId === player.id) ||
      ([] as PlayerItemEntity[]);

    for (const statKey of Object.values(StatsType)) {
      const base = this.#getBaseStat(statKey, player);
      const byLevel = this.#getByLevel(statKey, player.level);
      const bySet = this.#getBySet(statKey, playerInventory);
      const byParty = this.#getByParty(statKey, partyInventory);
      const byGuild = 0;
      const total = base + byLevel + bySet + byParty + byGuild;
      stats[statKey] = { base, byLevel, bySet, byParty, byGuild, total };
    }

    return stats;
  }

  #getBaseStat(statKey: StatsType, player: PlayerEntity) {
    if (!player || !player.stats || !player.stats[statKey]) {
      return 0;
    }

    const baseStat = player.stats[statKey] as unknown;

    if (typeof baseStat === 'number') {
      return baseStat;
    }

    return 0;
  }

  #getByLevel(statKey: StatsType, level: number) {
    if (statKey === StatsType.HP) {
      return level * 256;
    }

    return 0;
  }

  #getBySet(statKey: StatsType, playerInventory: PlayerItemEntity[]) {
    let bonus = 0;
    for (const inventory of playerInventory) {
      if (
        !inventory.isEquipped ||
        !inventory.item ||
        !inventory.item.set ||
        !inventory.item.set.effects
      ) {
        continue;
      }

      bonus += inventory.item.set.effects.reduce((acc, effect) => {
        if (this.#isEffectValid(effect, statKey, Target.SELF)) {
          return acc + (effect.value || 0);
        }
        return acc;
      }, 0);

      bonus +=
        inventory.item.effects?.reduce((acc, effect) => {
          if (this.#isEffectValid(effect, statKey, Target.SELF)) {
            return acc + (effect.value || 0);
          }
          return acc;
        }, 0) || 0;
    }

    return bonus;
  }

  #getByParty(statKey: StatsType, partyInventory: PlayerItemEntity[]) {
    let bonus = 0;
    for (const item of partyInventory) {
      if (
        !item.isEquipped ||
        !item.item ||
        !item.item.set ||
        !item.item.set.effects
      ) {
        continue;
      }
      bonus +=
        item.item.effects?.reduce((acc, effect) => {
          if (this.#isEffectValid(effect, statKey, Target.TEAM)) {
            return acc + (effect.value || 0);
          }
          return acc;
        }, 0) || 0;
    }
    return bonus;
  }

  #isEffectValid(effect: Effect, statKey: StatsType, target: Target) {
    return (
      effect &&
      effect.stats === statKey &&
      typeof effect.value === 'number' &&
      (!effect.target || effect.target !== target)
    );
  }
}
