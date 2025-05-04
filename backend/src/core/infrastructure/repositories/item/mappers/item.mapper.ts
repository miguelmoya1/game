import { ItemEntity } from '../../../../domain/entities';
import { Stats } from '../../../../domain/types';
import { ItemIncludePayload } from '../utils/item-includes';
import { setToEntity } from './set.mapper';

export const itemToEntity = (item: ItemIncludePayload) => {
  return ItemEntity.create({
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    useEffect: item.useEffect,
    rank: item.rank,
    spawnCategories: item.spawnCategories,
    imageUrl: item.imageUrl,

    stats: item.stats as Stats[],

    setId: item.setId,
    set: item.set ? setToEntity(item.set) : undefined,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,
  });
};
