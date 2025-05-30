import { PlaceList, PlaceListEntity } from '../../../../domain/entities';

export const placeListToEntity = (place: PlaceList) => {
  return PlaceListEntity.create({
    id: place.id,
    lat: place.lat,
    lng: place.lng,
    currentItemId: place.currentItemId,
  });
};
