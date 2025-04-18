import { PlaceBuilder } from '@game/builders';
import { PlaceDto } from '@game/dto';
import { Place } from '@game/entities';

function isPlaceDto(obj: unknown): obj is PlaceDto {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['apiId'] === 'string' &&
    typeof dto['name'] === 'string' &&
    typeof dto['lat'] === 'number' &&
    typeof dto['lng'] === 'number' &&
    (typeof dto['osmTags'] === 'object' || dto['osmTags'] === null) &&
    Array.isArray(dto['categories']) &&
    dto['categories'].every((cat) => typeof cat === 'string') &&
    typeof dto['createdAt'] === 'string' &&
    !isNaN(Date.parse(dto['createdAt'])) &&
    typeof dto['updatedAt'] === 'string' &&
    !isNaN(Date.parse(dto['updatedAt'])) &&
    (dto['deletedAt'] === null || (typeof dto['deletedAt'] === 'string' && !isNaN(Date.parse(dto['deletedAt']))))
  );
}

function isPlaceDtoArray(obj: unknown): obj is PlaceDto[] {
  return Array.isArray(obj) && obj.every(isPlaceDto);
}

export const mapPlaceToEntity = (data: unknown): Place => {
  if (!isPlaceDto(data)) {
    console.error('Invalid data structure for PlaceDto:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Place entity.');
  }
  return mapPlace(data);
};

export const mapPlaceArrayToEntityArray = (data: unknown): Place[] => {
  if (!isPlaceDtoArray(data)) {
    console.error('Invalid data structure for PlaceDto array:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Place[] entity array.');
  }

  return data.map(mapPlace);
};

const mapPlace = (data: PlaceDto): Place => {
  return new PlaceBuilder()
    .withId(data.id)
    .withApiId(data.apiId)
    .withName(data.name)
    .withLat(data.lat)
    .withLng(data.lng)
    .withOsmTags(data.osmTags)
    .withCategories(data.categories)
    .withCreatedAt(new Date(data.createdAt))
    .withUpdatedAt(new Date(data.updatedAt))
    .withDeletedAt(data.deletedAt ? new Date(data.deletedAt) : null)
    .build();
};
