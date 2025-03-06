import { CreatePlayerDto } from '@game/data/dto';
import { playerToEntity } from '@game/data/mappers';
import { DatabaseService, Player_db } from '@game/database';
import { PlayerRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlayerRepositoryImpl implements PlayerRepository {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async findById(id: string) {
    const sql = `
      SELECT 
        id,
        name,
        user_id,
        map_id,
        grid_x,
        grid_y,
        created_at,
        updated_at,
        deleted_at
      FROM 
        players
      WHERE 
        id = $1;
    `;

    const response = await this._databaseService.pg.query<Player_db>(sql, [id]);

    if (!response?.rows?.length) {
      return null;
    }

    return playerToEntity(response.rows[0]);
  }

  public async create(player: CreatePlayerDto) {
    const sql = `
      INSERT INTO players (name, user_id) VALUES ($1, $2) RETURNING *;
    `;

    const response = await this._databaseService.pg.query<Player_db>(sql, [player.name, player.userId]);

    if (!response?.rows?.length) {
      return null;
    }

    return playerToEntity(response.rows[0]);
  }
}
