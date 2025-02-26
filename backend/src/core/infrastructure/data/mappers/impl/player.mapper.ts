import { PlayerBuilder } from '@game/builder';
import { Player_db } from '@game/database';
import { Player } from '@game/entities';

export const playerToEntity = (player: Player_db): Player => {
  return new PlayerBuilder()
    .withId(player.id)
    .withName(player.name)

    .withGridX(player.grid_x)
    .withGridY(player.grid_y)

    .withMapId(player.map_id)
    .withUserId(player.user_id)

    .withCreatedAt(player.created_at)
    .withUpdatedAt(player.updated_at)
    .withDeletedAt(player.deleted_at)

    .build();
};
