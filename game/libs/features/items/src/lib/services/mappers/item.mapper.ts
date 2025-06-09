import { Rank } from '@game/shared';
import { ItemEntity } from '../../entities/item.entity';
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
    (typeof dto['imageUrl'] === 'string' ||
      dto['imageUrl'] === undefined ||
      dto['imageUrl'] === null) &&
    (typeof dto['rank'] === 'string' || dto['rank'] === null)
  );
};

export const mapItemArrayToEntityArray = (data: unknown) => {
  if (!Array.isArray(data) || !data.every(isItemDto)) {
    console.error('Invalid data structure for ItemDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Item[] entity array.',
    );
  }
  return data.map(mapItemToEntity);
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
  });
};
