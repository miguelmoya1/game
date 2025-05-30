import { Place, PlaceEntity } from '../../../../domain/entities';

export const placeToEntity = (place: Place) => {
  return PlaceEntity.create({
    id: place.id,
    apiId: place.apiId,
    name: place.name,
    lat: place.lat,
    lng: place.lng,
    osmTags: place.osmTags,
    categories: place.categories,
    currentItemId: place.currentItemId,
    createdAt: place.createdAt,
    updatedAt: place.updatedAt,
    deletedAt: place.deletedAt,
  });
};
