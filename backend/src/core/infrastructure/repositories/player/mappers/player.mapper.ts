import { Player as PlayerDb } from '@prisma/client';
import { PlayerEntity } from '../../../../domain/entities';
import { Stats } from '../../../../domain/types';

export const playerToEntity = (player: PlayerDb) => {
  return PlayerEntity.create({
    id: player.id,
    level: player.level,
    rank: player.rank,
    experience: player.experience,
    stats: player.stats as Stats[],
    userId: player.userId,
    raceId: player.raceId,
  });
};
