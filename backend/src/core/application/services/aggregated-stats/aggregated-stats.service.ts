import { Injectable } from '@nestjs/common';
import { ItemEntity, PlayerEntity, PlayerItemEntity, SetEntity } from '../../../domain/entities';
import { EffectTarget, StatsTypes } from '../../../domain/enums';
import { Effect } from '../../../domain/types';
import { AggregatedStats, AggregatedStatsService } from './aggregated-stats.service.contract';

@Injectable()
export class AggregatedStatsServiceImpl implements AggregatedStatsService {
  public calculate(player: PlayerEntity, partyInventory: PlayerItemEntity[], items: ItemEntity[], sets: SetEntity[]) {
    const stats: AggregatedStats = {} as AggregatedStats;

    for (const statKey of Object.values(StatsTypes)) {
      const base = this.#getBaseStat(statKey, player);
      const byLevel = this.#getByLevel(statKey, player.level);
      const byItems = this.#getByItems(statKey, player, partyInventory, items);
      const bySet = this.#getBySet(statKey, player, partyInventory, items, sets);
      const byPartySetsBonus = this.#getByPartySetsBonus(statKey, player, partyInventory, items, sets);
      const byGuild = 0;
      const total = base + byLevel + bySet + byItems + byPartySetsBonus + byGuild;

      stats[statKey] = {
        base,
        byLevel,
        bySet,
        byItems,
        byPartySetsBonus,
        byGuild,
        total,
      };
    }

    return stats;
  }

  #getBaseStat(statKey: StatsTypes, player: PlayerEntity) {
    if (!player || !player.stats || !player.stats[statKey]) {
      return 0;
    }

    const baseStat = player.stats[statKey] as unknown;

    if (typeof baseStat === 'number') {
      return baseStat;
    }

    return 0;
  }

  #getByLevel(statKey: StatsTypes, level: number) {
    if (statKey === StatsTypes.HP) {
      return level * 256;
    }

    return 0;
  }

  #getByItems(statKey: StatsTypes, player: PlayerEntity, partyInventory: PlayerItemEntity[], items: ItemEntity[]) {
    const playerItems = this.#getPlayerItems(player, partyInventory, items);

    return playerItems.reduce((acc, item) => {
      if (!item || !item.effects) {
        return acc;
      }

      return (
        acc +
        (item.effects.reduce((effectAcc, effect) => {
          if (this.#isEffectValid(effect, statKey, EffectTarget.Self)) {
            return effectAcc + (effect.value || 0);
          }
          return effectAcc;
        }, 0) || 0)
      );
    }, 0);
  }

  #getBySet(
    statKey: StatsTypes,
    player: PlayerEntity,
    partyInventory: PlayerItemEntity[],
    items: ItemEntity[],
    sets: SetEntity[],
  ) {
    const playerSets = this.#getPlayerSets(player, partyInventory, items, sets);

    return playerSets.reduce((acc, set) => {
      if (!set || !set.effects) {
        return acc;
      }

      const totalEquipped = this.#getTotalEquippedSets(player, partyInventory, items, set.id);

      const validEffects = set.effects
        .filter((effect) => this.#isEffectValid(effect, statKey, EffectTarget.Self))
        .filter((effect) => (effect.minimumItems || 0) <= totalEquipped);

      return (
        acc +
        (validEffects.reduce((effectAcc, effect) => {
          return effectAcc + (effect.value || 0);
        }, 0) || 0)
      );
    }, 0);
  }

  #getByPartySetsBonus(
    statKey: StatsTypes,
    player: PlayerEntity,
    partyInventory: PlayerItemEntity[],
    items: ItemEntity[],
    sets: SetEntity[],
  ) {
    const partySetsWithoutPlayer = this.#getPartySetsWithoutPlayer(player, partyInventory, items, sets);

    return partySetsWithoutPlayer.reduce((acc, set) => {
      if (!set || !set.effects) {
        return acc;
      }

      const totalEquipped = this.#getTotalEquippedSets(player, partyInventory, items, set.id);

      const validEffects = set.effects
        .filter(
          (effect) =>
            this.#isEffectValid(effect, statKey, EffectTarget.Ally) ||
            this.#isEffectValid(effect, statKey, EffectTarget.All),
        )
        .filter((effect) => (effect.minimumItems || 0) <= totalEquipped);

      return (
        acc +
        (validEffects.reduce((effectAcc, effect) => {
          return effectAcc + (effect.value || 0);
        }, 0) || 0)
      );
    }, 0);
  }

  #getPlayerItems(player: PlayerEntity, partyInventory: PlayerItemEntity[], items: ItemEntity[]) {
    const playerItemIds = partyInventory
      .filter((inventory) => inventory.playerId === player.id)
      .map((inventory) => inventory.itemId);

    return items.filter((item) => playerItemIds.includes(item.id));
  }

  #getPartySetsWithoutPlayer(
    player: PlayerEntity,
    partyInventory: PlayerItemEntity[],
    items: ItemEntity[],
    sets: SetEntity[],
  ) {
    const partyInventoryWithoutPlayer = partyInventory.filter((inventory) => inventory.playerId !== player.id);

    const partyItems = items.filter((item) =>
      partyInventoryWithoutPlayer.some((inventory) => inventory.itemId === item.id),
    );

    const setIds = partyItems.filter((item) => item.setId).map((item) => item.setId);

    return sets.filter((set) => setIds.includes(set.id));
  }

  #getPlayerSets(player: PlayerEntity, partyInventory: PlayerItemEntity[], items: ItemEntity[], sets: SetEntity[]) {
    const playerItems = this.#getPlayerItems(player, partyInventory, items);

    const setIds = playerItems.filter((item) => item.setId).map((item) => item.setId);

    return sets.filter((set) => setIds.includes(set.id));
  }

  #getTotalEquippedSets(player: PlayerEntity, partyInventory: PlayerItemEntity[], items: ItemEntity[], setId: string) {
    const playerItemSetEquipped = this.#getPlayerItems(
      player,
      partyInventory.filter((item) => item.isEquipped),
      items,
    ).filter((item) => item.setId === setId);

    return playerItemSetEquipped.length;
  }

  #isEffectValid(effect: Effect, statKey: StatsTypes, target: EffectTarget) {
    return (
      effect &&
      effect.statType === statKey &&
      typeof effect.value === 'number' &&
      (!effect.target || effect.target !== target)
    );
  }
}
