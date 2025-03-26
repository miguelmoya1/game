import { inject } from '../../../di/di-manager.ts';
import { DATABASE_SERVICE } from '../../application/services/database/database.service.contract.ts';
import type { PlacesRepository } from '../../domain/interfaces/places.repository.ts';
import { placeToEntity } from '../data/mappers/place.mapper.ts';
import { Place_db } from '../database/place.db.ts';

export class PlacesRepositoryImpl implements PlacesRepository {
  readonly #databaseService = inject(DATABASE_SERVICE);
  readonly #pg = this.#databaseService.pg;

  async get(latitude: number, longitude: number, radius = 1500) {
    const sql = `
      SELECT * FROM places WHERE ST_DWithin(geom, ST_MakePoint($1, $2)::geography, $3);
    `;

    const response = await this.#pg.query<Place_db>(sql, [longitude, latitude, radius]);

    return response.rows.map(placeToEntity);
  }
}
