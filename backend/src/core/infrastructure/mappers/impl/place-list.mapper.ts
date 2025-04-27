import { Item as ItemDb, Place as PlaceDb } from '@prisma/client';
import { PlaceListEntity } from '../../../domain/entities';

export const placeListToEntity = (place: PlaceDb & { currentItem: ItemDb }) => {
  return PlaceListEntity.create({
    id: place.id,
    lat: place.lat,
    lng: place.lng,
  });
};
