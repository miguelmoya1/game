import { PointListEntity } from '../../entities/point-list.entity';
import { PointListDto } from '../dto/point-list.dto';

const isPointListDto = (obj: unknown): obj is PointListDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }
  const dto = obj as Record<string, unknown>;
  return (
    typeof dto['lat'] === 'number' &&
    typeof dto['lng'] === 'number' &&
    typeof dto['placeId'] === 'string' &&
    typeof dto['hasDungeon'] === 'boolean' &&
    typeof dto['placePermissions'] === 'object' &&
    dto['placePermissions'] !== null
  );
};

const isPointListDtoArray = (obj: unknown): obj is PointListDto[] => {
  return Array.isArray(obj) && obj.every(isPointListDto);
};

export const mapPointListToEntity = (data: unknown) => {
  if (!isPointListDto(data)) {
    console.error('Invalid data structure for PointListDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to PointList entity.',
    );
  }
  return mapPointList(data);
};

export const mapPointListArrayToEntityArray = (data: unknown) => {
  if (!isPointListDtoArray(data)) {
    console.error('Invalid data structure for PointListDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to PointList[] entity array.',
    );
  }
  return data.map(mapPointList);
};

const mapPointList = (data: PointListDto) => {
  return PointListEntity.create({
    lat: data.lat,
    lng: data.lng,
    placeId: data.placeId,
    hasDungeon: data.hasDungeon,
    placePermissions: data.placePermissions,
  });
};
