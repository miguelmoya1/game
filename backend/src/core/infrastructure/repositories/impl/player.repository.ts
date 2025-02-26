import { playerToEntity } from '@game/data/mappers';
import { DatabaseService, Player_db } from '@game/database';
import { PlayerRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

type CreateParams = {
  readonly userId: string;
  readonly isPrimary?: boolean;
};

@Injectable()
export class PlayerRepositoryImpl implements PlayerRepository {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async findById(id: string) {
    const sql = `
      SELECT * FROM players WHERE id = $1;
    `;

    const response = await this._databaseService.pg.query<Player_db>(sql, [id]);

    if (!response?.rows?.length) {
      return null;
    }

    return playerToEntity(response.rows[0]);
  }
}
