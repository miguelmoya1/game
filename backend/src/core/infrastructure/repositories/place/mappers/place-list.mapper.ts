import { PlaceListEntity } from '../../../../domain/entities';
import { PlaceListIncludePayload } from '../utils/place-includes';

export const placeListToEntity = (place: PlaceListIncludePayload) => {
  return PlaceListEntity.create({
    id: place.id,
    lat: place.lat,
    lng: place.lng,
    currentItemId: place.currentItemId,
  });
};
