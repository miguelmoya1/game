import { Set as SetDb } from '@prisma/client';
import { SetEntity } from '../../../../domain/entities';
import { Effect } from '../../../../domain/types';

export const setToEntity = (item: SetDb) => {
  return SetEntity.create({
    id: item.id,
    name: item.name,
    description: item.description,

    effects: item.effects as Effect[],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deletedAt: item.deletedAt,
  });
};
