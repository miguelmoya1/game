import { PlayerEntity } from '../../../models/player.entity';
import { AggregatedStats } from '../../party/dto/party.dto';
import { PlayerDto } from '../dto/player.dto';

const isPlayerDto = (obj: unknown): obj is PlayerDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['level'] === 'number' &&
    typeof dto['rank'] === 'string' &&
    (typeof dto['nickname'] === 'string' || dto['nickname'] === null) &&
    typeof dto['experience'] === 'number' &&
    Array.isArray(dto['stats']) &&
    typeof dto['userId'] === 'string' &&
    typeof dto['raceId'] === 'string' &&
    typeof dto['aggregatedStats'] === 'object' &&
    dto['aggregatedStats'] !== null
  );
};

export const mapPlayerArrayToEntityArray = (players: unknown) => {
  if (!Array.isArray(players)) {
    throw new Error('Invalid players data');
  }

  return players.map(mapPlayerToEntity);
};

export const mapPlayerToEntity = (player: unknown) => {
  if (!isPlayerDto(player)) {
    throw new Error('Invalid player data');
  }

  return PlayerEntity.create({
    id: player.id,
    level: player.level,
    rank: player.rank,
    nickname: player.nickname,
    experience: player.experience,
    stats: player.stats,
    userId: player.userId,
    raceId: player.raceId,
    aggregatedStats: player.aggregatedStats as AggregatedStats,
  });
};
