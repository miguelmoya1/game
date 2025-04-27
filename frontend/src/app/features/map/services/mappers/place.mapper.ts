import { PlaceEntity } from '@game/shared/models/impl/place.entity';
import { PlaceDto } from '../dtos/place.dto';

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

export const mapPlaceToEntity = (data: unknown) => {
  if (!isPlaceDto(data)) {
    console.error('Invalid data structure for PlaceDto:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Place entity.');
  }
  return mapPlace(data);
};

export const mapPlaceArrayToEntityArray = (data: unknown) => {
  if (!isPlaceDtoArray(data)) {
    console.error('Invalid data structure for PlaceDto array:', data);
    throw new TypeError('Invalid data structure received. Cannot map to Place[] entity array.');
  }

  return data.map(mapPlace);
};

const mapPlace = (data: PlaceDto): PlaceEntity => {
  return PlaceEntity.create({
    id: data.id,
    apiId: data.apiId,
    name: data.name,
    lat: data.lat,
    lng: data.lng,
    categories: data.categories,
    currentItemId: data.currentItemId,
    currentItem: data.currentItem,
    createdAt: new Date(data.createdAt),
    updatedAt: new Date(data.updatedAt),
    permissions: data.permissions,
    deletedAt: data.deletedAt ? new Date(data.deletedAt) : null,
  });
};
