import { PlayerEntity } from '@game/core';
import { PlayerDto } from '../dto/player.dto';

const isPlayerDto = (obj: unknown): obj is PlayerDto => {
  if (typeof obj !== 'object' || obj === null) return false;
  const dto = obj as Record<string, unknown>;
  return (
    typeof dto['id'] === 'string' &&
    typeof dto['level'] === 'number' &&
    typeof dto['rank'] === 'string' &&
    typeof dto['experience'] === 'number' &&
    Array.isArray(dto['stats']) &&
    typeof dto['userId'] === 'string' &&
    typeof dto['raceId'] === 'string'
  );
};

const isPlayerDtoArray = (obj: unknown): obj is PlayerDto[] => {
  return Array.isArray(obj) && obj.every(isPlayerDto);
};

export const mapPlayerToEntity = (data: unknown) => {
  if (!isPlayerDto(data)) {
    console.error('Invalid data structure for PlayerDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Player entity.'
    );
  }
  return PlayerEntity.create(data);
};

export const mapPlayerArrayToEntityArray = (data: unknown) => {
  if (!isPlayerDtoArray(data)) {
    console.error('Invalid data structure for PlayerDto array:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Player[] entity array.'
    );
  }
  return data.map(PlayerEntity.create);
};
