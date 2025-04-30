import { StatBonus as StatBonusDb } from '@prisma/client';
import { StatBonusEntity } from '../../../domain/entities/impl/stat-bonus.entity';

export const statBonusToEntity = (item: StatBonusDb) => {
  return StatBonusEntity.create({
    id: item.id,
    type: item.type,
    value: item.value,
    itemId: item.itemId,
    setEffectId: item.setEffectId,
  });
};
