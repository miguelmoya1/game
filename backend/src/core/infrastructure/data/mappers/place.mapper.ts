import { PlaceBuilder } from '../../../domain/builders/place.builder.ts';
import { Place } from '../../../domain/entities/place.entity.ts';
import type { Place_db } from '../../database/place.db.ts';

export const placeToEntity = (place: Place_db): Place => {
  return new PlaceBuilder()
    .withId(place.id)

    .withApiId(place.api_id)
    .withName(place.name)
    .withLat(place.lat)
    .withLng(place.lng)
    .withAddressName(place.address_name)
    .withAmenity(place.amenity)

    .withCreatedAt(place.created_at)
    .withUpdatedAt(place.updated_at)
    .withDeletedAt(place.deleted_at)

    .build();
};
