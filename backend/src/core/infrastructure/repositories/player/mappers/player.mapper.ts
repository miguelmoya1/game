import { Player as PlayerDb } from '@prisma/client';
import { PlayerEntity } from '../../../../domain/entities';
import { Stats } from '../../../../domain/enums';

export const playerToEntity = (player: PlayerDb) => {
  return PlayerEntity.create({
    id: player.id,
    level: player.level,
    rank: player.rank,
    nickname: player.nickname,
    experience: player.experience,
    stats: player.stats as Stats[],
    userId: player.userId,
    raceId: player.raceId,
  });
};
