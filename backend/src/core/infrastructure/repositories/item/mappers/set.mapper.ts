import { SetEntity, Set } from '../../../../domain/entities';

export const setToEntity = (item: Set) => {
  return SetEntity.create({
    id: item.id,
    name: item.name,
    description: item.description,

    effects: item.effects,
  });
};
