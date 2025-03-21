import { inject } from '../../../di/di-manager.ts';
import { DATABASE_SERVICE } from '../../application/services/database/database.service.contract.ts';
import type { UserRepository } from '../../domain/interfaces/user.repository.ts';
import type { CreateUserDto } from '../data/dtos/user/create-user.dto.ts';
import type { UpdateUserDto } from '../data/dtos/user/update-user.dto.ts';
import { userToEntity } from '../data/mappers/user.mapper.ts';
import type { User_db } from '../database/user.db.ts';

export class UserRepositoryImpl implements UserRepository {
  readonly #databaseService = inject(DATABASE_SERVICE);
  readonly #pg = this.#databaseService.pg;

  async create(createUserDto: CreateUserDto) {
    const sql = `
      INSERT INTO users (name, surname) VALUES ($1, $2) RETURNING *;
    `;

    const response = await this.#pg.query<User_db>(sql, [createUserDto.name, createUserDto.surname]);

    if (!response?.rows?.length) {
      return null;
    }

    return userToEntity(response.rows[0]);
  }

  async findById(id: string) {
    const sql = `
      SELECT * FROM users WHERE id = $1;
    `;

    const response = await this.#pg.query<User_db>(sql, [id]);

    if (!response?.rows?.length) {
      return null;
    }

    return userToEntity(response.rows[0]);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const sql = `
      UPDATE users SET nickname = $1 WHERE id = $2 RETURNING *;
    `;

    const response = await this.#pg.query<User_db>(sql, [updateUserDto.nickname, id]);

    if (!response?.rows?.length) {
      return null;
    }

    return userToEntity(response.rows[0]);
  }
}
