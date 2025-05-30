import { Inject, Injectable } from '@nestjs/common';
import { Effect } from '../../../domain/types';
import {
  ItemEntity,
  PlayerEntity,
  PlayerItemEntity,
} from '../../../domain/entities';
import { Stats } from '../../../domain/enums';
import {
  AggregatedStats,
  AggregatedStatsService,
} from './aggregated-stats.service.contract';
import { Redis } from 'ioredis';
import { PLAYER_ITEM_REPOSITORY } from 'src/core/infrastructure/repositories';

@Injectable()
export class AggregatedStatsServiceImpl implements AggregatedStatsService {
  constructor(@Inject(PLAYER_ITEM_REPOSITORY) private readonly ) {}

  public calculate(
    player: PlayerEntity,
    partyInventory: PlayerItemEntity[]
  ) {
    const stats: AggregatedStats = {} as AggregatedStats;

    const playerItemIds = partyInventory
      .filter((partyInventory) => partyInventory.playerId === player.id)
      .filter((partyInventory) => partyInventory.isEquipped)
      .map((playerInventory) => playerInventory.itemId);
    const playerItems = items.filter((item) => playerItemIds.includes(item.id));

    const partyItemIds = partyInventory
      .filter((partyInventory) => partyInventory.isEquipped)
      .map((playerInventory) => playerInventory.itemId);
    const partyItems = items.filter((item) => partyItemIds.includes(item.id));

    for (const statKey of Object.values(Stats)) {
      const base = this.#getBaseStat(statKey, player);
      const byLevel = this.#getByLevel(statKey, player.level);
      const bySet = this.#getBySet(statKey, playerItems);
      const byParty = this.#getByParty(statKey, partyItems);
      const byGuild = 0;
      const total = base + byLevel + bySet + byParty + byGuild;

      stats[statKey] = { base, byLevel, bySet, byParty, byGuild, total };
    }

    return stats;
  }

  #getBaseStat(statKey: Stats, player: PlayerEntity) {
    if (!player || !player.stats || !player.stats[statKey]) {
      return 0;
    }

    const baseStat = player.stats[statKey] as unknown;

    if (typeof baseStat === 'number') {
      return baseStat;
    }

    return 0;
  }

  #getByLevel(statKey: Stats, level: number) {
    if (statKey === Stats.HP) {
      return level * 256;
    }

    return 0;
  }

  #getBySet(statKey: Stats, playerInventory: PlayerItemEntity[]) {
    let bonus = 0;
    for (const item of playerInventory) {
      if (!item || !item.set || !item.set.effects) {
        continue;
      }

      bonus += item.item.set.effects.reduce((acc, effect) => {
        if (this.#isEffectValid(effect, statKey, Target.SELF)) {
          return acc + (effect.value || 0);
        }
        return acc;
      }, 0);

      bonus +=
        item.item.effects?.reduce((acc, effect) => {
          if (this.#isEffectValid(effect, statKey, Target.SELF)) {
            return acc + (effect.value || 0);
          }
          return acc;
        }, 0) || 0;
    }

    return bonus;
  }

  #getByParty(statKey: StatsType, partyInventory: ItemEntity[]) {
    let bonus = 0;
    for (const partyItem of partyInventory) {
      if (
        !partyItem.isEquipped ||
        !partyItem.item ||
        !partyItem.item.set ||
        !partyItem.item.set.effects
      ) {
        continue;
      }
      bonus +=
        partyItem.item.effects?.reduce((acc, effect) => {
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
