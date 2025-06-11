import { PointEntity } from '../../entities/point.entity';
import { PointDto } from '../dto/point.dto';

const isPointDto = (obj: unknown): obj is PointDto => {
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

const isPointDtoArray = (obj: unknown): obj is PointDto[] => {
  return Array.isArray(obj) && obj.every(isPointDto);
};

export const mapPointToEntity = (data: unknown) => {
  if (!isPointDto(data)) {
    console.error('Invalid data structure for PointDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Point entity.',
    );
  }
  return mapPoint(data);
};

export const mapPointArrayToEntityArray = (data: unknown) => {
  if (!isPointDtoArray(data)) {
    console.error('Invalid data structure for PointDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Point[] entity array.',
    );
  }
  return data.map(mapPoint);
};

const mapPoint = (data: PointDto) => {
  return PointEntity.create({
    lat: data.lat,
    lng: data.lng,
    placeId: data.placeId,
    hasDungeon: data.hasDungeon,
    placePermissions: data.placePermissions,
  });
};
