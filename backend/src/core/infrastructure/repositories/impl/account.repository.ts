import { CreateAccountDto } from '@game/data/dto';
import { accountToEntity } from '@game/data/mappers';
import { DatabaseService } from '@game/database';
import { AccountRepository } from '@game/interfaces';
import { Injectable } from '@nestjs/common';

type CreateParams = {
  readonly userId: string;
  readonly isPrimary?: boolean;
};

@Injectable()
export class AccountRepositoryImpl implements AccountRepository {
  constructor(private readonly _databaseService: DatabaseService) {}

  public async findByHash(hashForPasswordReset: string) {
    const sql = `
      SELECT * FROM accounts WHERE hashForPasswordReset = $1;
    `;

    const response = await this._databaseService.pg.query(sql, [hashForPasswordReset]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }

  public async changePassword(accountId: string, password: string) {
    const sql = `
      UPDATE accounts SET password = $1, hashForPasswordReset = NULL, hashExpiredAt = NULL WHERE id = $2 RETURNING *;
    `;

    const response = await this._databaseService.pg.query(sql, [password, accountId]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }

  public async forgotPassword(email: string, hash: string) {
    const sql = `
      UPDATE accounts SET hashForPasswordReset = $1, hashExpiredAt = NOW() + INTERVAL '1 hour' WHERE email = $2 RETURNING *;
    `;

    const response = await this._databaseService.pg.query(sql, [hash, email]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }

  public async confirm(accountId: string) {
    const sql = `
      UPDATE accounts SET isConfirmed = TRUE WHERE id = $1 RETURNING *;
    `;

    const response = await this._databaseService.pg.query(sql, [accountId]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }

  public async getById(accountId: string) {
    const sql = `
      SELECT * FROM accounts WHERE id = $1;
    `;

    const response = await this._databaseService.pg.query(sql, [accountId]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }

  public async create(createAccountDto: CreateAccountDto, params: CreateParams) {
    const { userId, isPrimary } = params;

    const sql = `
      INSERT INTO accounts (provider, providerId, email, password, isPrimary, userId)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING *;
    `;

    const response = await this._databaseService.pg.query(sql, [
      createAccountDto.provider,
      createAccountDto.providerId,
      createAccountDto.email,
      createAccountDto.password,
      isPrimary,
      userId,
    ]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }

  public async getOneByProviderEmail(email: string) {
    const sql = `
      SELECT * FROM accounts WHERE provider = 'EMAIL' AND email = $1;
    `;

    const response = await this._databaseService.pg.query(sql, [email]);

    if (!response?.rows?.length) {
      return null;
    }

    return accountToEntity(response.rows[0]);
  }
}
