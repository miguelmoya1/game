import { PlayerEntity } from '../../models/player.entity';
import { PlayerDto } from '../dto/player.dto';

const isPlayerDto = (obj: unknown): obj is PlayerDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['name'] === 'string' &&
    (typeof dto['surname'] === 'string' || dto['surname'] === null) &&
    typeof dto['nickname'] === 'string' &&
    typeof dto['language'] === 'string' &&
    typeof dto['role'] === 'string' &&
    typeof dto['createdAt'] === 'string' &&
    !isNaN(Date.parse(dto['createdAt'])) &&
    typeof dto['updatedAt'] === 'string' &&
    !isNaN(Date.parse(dto['updatedAt'])) &&
    (dto['deletedAt'] === null ||
      (typeof dto['deletedAt'] === 'string' &&
        !isNaN(Date.parse(dto['deletedAt']))))
  );
};

export const mapPlayerToEntity = (player: unknown) => {
  if (!isPlayerDto(player)) {
    throw new Error('Invalid player data');
  }

  return PlayerEntity.create({
    id: player.id,
    level: player.level,
    rank: player.rank,
    experience: player.experience,
    stats: player.stats,
    userId: player.userId,
    raceId: player.raceId,
  });
};
