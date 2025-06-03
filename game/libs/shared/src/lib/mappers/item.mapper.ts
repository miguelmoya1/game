import { ItemEntity, Rank } from '@game/core';
import { ItemDto } from '../dto/item.dto';

const isItemDto = (obj: unknown): obj is ItemDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['name'] === 'string' &&
    (typeof dto['description'] === 'string' || dto['description'] === null) &&
    typeof dto['itemType'] === 'string' &&
    (typeof dto['imageUrl'] === 'string' || dto['imageUrl'] === null) &&
    (typeof dto['rank'] === 'string' || dto['rank'] === null)
  );
};

export const mapItemToEntity = (data: unknown) => {
  if (!isItemDto(data)) {
    console.error('Invalid data structure for ItemListDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to ItemList entity.',
    );
  }

  return ItemEntity.create({
    id: data.id,
    name: data.name,
    description: data.description,
    itemType: data.itemType,
    imageUrl: data.imageUrl,
    effects: data.effects,
    rank: data.rank as Rank,
    setId: data.setId ?? undefined,
    spawnCategories: data.spawnCategories,
    permissions: data.permissions,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
  });
};
