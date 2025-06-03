import { PlaceListEntity } from '@game/core';
import { PlaceListDto } from '../dto/place-list.dto';

const isPlaceListDto = (obj: unknown): obj is PlaceListDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['lat'] === 'number' &&
    typeof dto['lng'] === 'number'
  );
};

const isPlaceListDtoArray = (obj: unknown): obj is PlaceListDto[] => {
  return Array.isArray(obj) && obj.every(isPlaceListDto);
};

export const mapPlaceListToEntity = (data: unknown) => {
  if (!isPlaceListDto(data)) {
    console.error('Invalid data structure for PlaceListDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Place entity.'
    );
  }
  return mapPlaceList(data);
};

export const mapPlaceListArrayToEntityArray = (data: unknown) => {
  if (!isPlaceListDtoArray(data)) {
    console.error('Invalid data structure for PlaceListDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Place[] entity array.'
    );
  }

  return data.map(mapPlaceList);
};

const mapPlaceList = (data: PlaceListDto) => {
  return PlaceListEntity.create({
    id: data.id,
    lat: data.lat,
    lng: data.lng,
    permissions: data.permissions,
  });
};
