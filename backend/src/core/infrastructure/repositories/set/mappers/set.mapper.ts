import { Set, SetEntity } from '../../../../domain/entities';

export const setToEntity = (set: Set) => {
  return SetEntity.create({
    id: set.id,
    name: set.name,
    description: set.description,
    effects: set.effects,
  });
};
