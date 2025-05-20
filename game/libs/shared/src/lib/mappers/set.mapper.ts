import { SetEntity } from '@game/core';
import { SetDto } from '../dto/set.dto';

const isSetDto = (obj: unknown): obj is SetDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return typeof dto['id'] === 'string' && typeof dto['name'] === 'string';
};

export const mapSetToEntity = (data: unknown) => {
  if (!isSetDto(data)) {
    console.error('Invalid data structure for SetDto:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to Set entity.'
    );
  }
  return mapSet(data);
};

const mapSet = (data: SetDto) => {
  return SetEntity.create({
    id: data.id,
    name: data.name,
    description: data.description,
    effects: data.effects,
    createdAt: data.createdAt,
    updatedAt: data.updatedAt,
    deletedAt: data.deletedAt,
  });
};
