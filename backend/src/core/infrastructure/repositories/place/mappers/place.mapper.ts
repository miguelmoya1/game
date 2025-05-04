import { Place as PlaceDb } from '@prisma/client';
import { PlaceEntity } from '../../../../domain/entities';
import { itemToEntity } from '../../item/mappers/item.mapper';
import { PlaceIncludePayload } from '../utils/place-includes';

export const placeToEntity = (place: PlaceIncludePayload) => {
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

export const placeListToEntity = (place: PlaceDb) => {
  return PlaceEntity.create({
    id: place.id,
    apiId: place.apiId,
    name: place.name,
    lat: place.lat,
    lng: place.lng,
    osmTags: place.osmTags as Record<string, string> | null,
    currentItemId: place.currentItemId,
    categories: place.categories,
    createdAt: place.createdAt,
    updatedAt: place.updatedAt,
    deletedAt: place.deletedAt,
  });
};
