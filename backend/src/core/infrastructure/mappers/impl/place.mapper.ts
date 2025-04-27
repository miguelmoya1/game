import { Item as ItemDb, Place as PlaceDb } from '@prisma/client';
import { PlaceEntity } from '../../../domain/entities';
import { itemToEntity } from './item.mapper';

export const placeToEntity = (place: PlaceDb & { currentItem: ItemDb }) => {
  return PlaceEntity.create({
    id: place.id,
    apiId: place.apiId,
    name: place.name,
    lat: place.lat,
    lng: place.lng,
    osmTags: place.osmTags as Record<string, string> | null,
    categories: place.categories,
    currentItemId: place.currentItemId,
    currentItem: itemToEntity(place.currentItem),
    createdAt: place.createdAt,
    updatedAt: place.updatedAt,
    deletedAt: place.deletedAt,
  });
};
