import { Item as ItemDb } from '@prisma/client';
import { ItemBuilder } from '../../../domain/builders';
import { Item } from '../../../domain/entities/impl/item.entity';

export const itemToEntity = (item: ItemDb): Item => {
  return new ItemBuilder()
    .withId(item.id)

    .withName(item.name)
    .withDescription(item.description)
    .withItemType(item.itemType)
    .withEffect(item.useEffect)
    .withRank(item.rank)
    .withSpawnCategories(item.spawnCategories)

    .withCreatedAt(item.createdAt)
    .withUpdatedAt(item.updatedAt)

    .build();
};
