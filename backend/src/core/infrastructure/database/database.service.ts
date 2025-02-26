import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';
import { Pool } from 'pg';

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
    await this.#createTables();
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

  async #createTables() {
    const sqlDirectory = join(__dirname, 'sql');
    const sqlFiles = await readdir(sqlDirectory);

    for (const file of sqlFiles.filter((file) => file.endsWith('.sql'))) {
      const filePath = join(sqlDirectory, file);
      const sql = await readFile(filePath, 'utf8');

      try {
        await this.#pg.query(sql);
        this.#logger.log(`Executed ${file} successfully`);
      } catch (error) {
        this.#logger.error(`Error executing ${file}:`, error);
      }
    }

    this.#logger.log('Tables created successfully');
  }
}
