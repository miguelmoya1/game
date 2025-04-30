import { Item as ItemDb, StatBonus as StatBonusDb } from '@prisma/client';
import { ItemEntity } from '../../../domain/entities';
import { statBonusToEntity } from './statBonuses.mapper';

export const itemToEntity = (
  item: ItemDb & { statBonuses?: StatBonusDb[]; set?: any },
) => {
  return ItemEntity.create({
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    useEffect: item.useEffect,
    rank: item.rank,
    spawnCategories: item.spawnCategories,

    statBonuses: item.statBonuses
      ? item.statBonuses.map(statBonusToEntity)
      : undefined,

    // set: setToEntity(item.set),

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  });
};
