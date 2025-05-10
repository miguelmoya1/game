import { Set as SetDb } from '@prisma/client';
import { SetEntity } from '../../../../domain/entities';
import { Effect } from '../../../../domain/types';

export const setToEntity = (set: SetDb) => {
  return SetEntity.create({
    id: set.id,
    name: set.name,
    description: set.description,
    effects: set.effects as Effect[],
    createdAt: set.createdAt,
    updatedAt: set.updatedAt,
    deletedAt: set.deletedAt,
  });
};
