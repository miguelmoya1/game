import { CreateUserDto, UpdateUserDto } from '@game/data/dto';
import { userToEntity } from '@game/data/mappers';
import { DatabaseService, User_db } from '@game/database';
import { UserRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly _databaseService: DatabaseService) {}

  protected readonly pg = this._databaseService.pg;

  public async create(createUserDto: CreateUserDto) {
    const sql = `
      INSERT INTO users (name, surname) VALUES ($1, $2) RETURNING *;
    `;

    const response = await this.pg.query<User_db>(sql, [createUserDto.name, createUserDto.surname]);

    if (!response?.rows?.length) {
      return null;
    }

    return userToEntity(response.rows[0]);
  }

  public async findById(id: string) {
    const sql = `
      SELECT * FROM users WHERE id = $1;
    `;

    const response = await this.pg.query<User_db>(sql, [id]);

    if (!response?.rows?.length) {
      return null;
    }

    return userToEntity(response.rows[0]);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const sql = `
      UPDATE users SET nickname = $1 WHERE id = $2 RETURNING *;
    `;

    const response = await this.pg.query<User_db>(sql, [updateUserDto.nickname, id]);

    if (!response?.rows?.length) {
      return null;
    }

    return userToEntity(response.rows[0]);
  }
}
