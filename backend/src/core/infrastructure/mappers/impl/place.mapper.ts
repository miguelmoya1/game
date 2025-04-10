import { Place as PlaceDb } from '@prisma/client';
import { PlaceBuilder } from '../../../domain/builders/place.builder';
import { Place } from '../../../domain/entities/impl/place.entity';

export const placeToEntity = (place: PlaceDb): Place => {
  return new PlaceBuilder()
    .withId(place.id)

    .withApiId(place.apiId)
    .withName(place.name)
    .withLat(place.lat)
    .withLng(place.lng)
    .withOsmTags(place.osmTags as Record<string, string> | null)
    .withCategories(place.categories)

    .withCreatedAt(place.createdAt)
    .withUpdatedAt(place.updatedAt)
    .withDeletedAt(place.deletedAt)

    .build();
};
