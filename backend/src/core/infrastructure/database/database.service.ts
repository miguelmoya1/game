import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import { createAccountSql, createUserSql } from './tables';

@Injectable()
export class DatabaseService {
  readonly #logger = new Logger(DatabaseService.name);
  readonly #pg: Pool;

  constructor(private configService: ConfigService) {
    this.#logger.log('DatabaseService initialized');
    this.#pg = new Pool({
      host: this.configService.get('DB_HOST') || 'localhost',
      port: this.configService.get('DB_PORT') || 5432,
      user: this.configService.get('DB_USER') || 'user',
      password: this.configService.get('DB_PASSWORD') || 'password',
      database: this.configService.get('DB_DATABASE') || 'database',
      max: 20,
    });

    this.#init();
  }

  get pg() {
    return this.#pg;
  }

  async #init() {
    await this.#connect();
    await this.#prepareExtensionsAndFunctions();
    await this.#createTable();
  }

  async #connect() {
    try {
      await this.#pg.connect();
      this.#logger.log('Database connected successfully');
    } catch (error) {
      this.#logger.error('Database connection failed:', error);
      throw error;
    }
  }

  async #prepareExtensionsAndFunctions() {
    await this.#pg.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

    await this.#pg.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);
  }

  async #createTable() {
    await this.#pg.query(createUserSql());
    await this.#pg.query(createAccountSql());

    this.#logger.log('Tables created successfully');
  }
}
