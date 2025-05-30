import { ItemEntity, Item } from '../../../../domain/entities';

export const itemToEntity = (item: Item) => {
  return ItemEntity.create({
    id: item.id,
    name: item.name,
    description: item.description,
    itemType: item.itemType,
    effects: item.effects,
    rank: item.rank,
    spawnCategories: item.spawnCategories,
    imageUrl: item.imageUrl,

    setId: item.setId,
  });
};
