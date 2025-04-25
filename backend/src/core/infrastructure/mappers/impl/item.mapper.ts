import { Item as ItemDb } from '@prisma/client';
import { ItemEntity } from '../../../domain/entities';

export const itemToEntity = (item: ItemDb): ItemEntity => {
  return ItemEntity.create({
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    useEffect: item.useEffect,
    rank: item.rank,
    spawnCategories: item.spawnCategories,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  });
};
