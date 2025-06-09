import { DungeonEntity } from '../../entities/dungeon.entity';
import { DungeonDto } from '../dto/dungeon.dto';

function isDungeonDto(dto: unknown): dto is DungeonDto {
  return (
    typeof dto === 'object' &&
    dto !== null &&
    'id' in dto &&
    typeof dto.id === 'string' &&
    'name' in dto &&
    typeof dto.name === 'string' &&
    'level' in dto &&
    typeof dto.level === 'number'
  );
}

export function mapDungeonDtoToEntity(dto: unknown) {
  if (!isDungeonDto(dto)) {
    throw new TypeError('Invalid DungeonDto');
  }

  return DungeonEntity.create({
    placeId: dto.placeId,
    lat: dto.lat,
    lng: dto.lng,
    type: dto.type,
    rank: dto.rank,
    status: dto.status,
    startTime: new Date(dto.startTime),
    endTime: new Date(dto.endTime),
    rewards: dto.rewards || [],
  });
}

export function mapDungeonArrayToEntityArray(dtos: unknown) {
  if (!Array.isArray(dtos)) {
    throw new TypeError('Expected an array of DungeonDto');
  }

  return dtos.map(mapDungeonDtoToEntity);
}
