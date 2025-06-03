import { SetEntity } from '../entities/set.entity';
import { SetDto } from '../services/dto/set.dto';

const isSetDto = (obj: unknown): obj is SetDto => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return (
    typeof dto['id'] === 'string' &&
    typeof dto['name'] === 'string' &&
    (dto['description'] === null || typeof dto['description'] === 'string') &&
    (dto['effects'] === undefined ||
      (Array.isArray(dto['effects']) &&
        dto['effects'].every((effect) => typeof effect === 'object')))
  );
};

export const mapSetArrayToEntityArray = (players: unknown) => {
  if (!Array.isArray(players)) {
    throw new Error('Invalid players data');
  }

  return players.map(mapSetToEntity);
};

export const mapSetToEntity = (player: unknown) => {
  if (!isSetDto(player)) {
    throw new Error('Invalid player data');
  }

  return SetEntity.create({
    id: player.id,
    name: player.name,
    description: player.description,
    effects: player.effects,
  });
};
