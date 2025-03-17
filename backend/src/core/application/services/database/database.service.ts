import { readdir, readFile } from 'node:fs/promises';
import { join } from 'path';
import pg from 'pg';
import type { DatabaseService } from './database.service.contract';

export class DatabaseServiceImpl implements DatabaseService {
  readonly #pg: pg.Pool;

  constructor() {
    this.#pg = new pg.Pool({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
      user: process.env.DB_USER || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_DATABASE || 'database',
      max: 20,
    });
  }

  public get pg() {
    return this.#pg;
  }

  public async connect() {
    try {
      await this.#pg.connect();
      console.log('Database connected successfully');
    } catch (error) {
      console.error('Database connection failed:', error);
      throw error;
    }

    await this.#prepareExtensionsAndFunctions();
    await this.#createTables();
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
    const sqlDirectory = join('sql');
    const sqlFiles = await readdir(sqlDirectory);

    for (const file of sqlFiles.filter((file) => file.endsWith('.sql'))) {
      const filePath = join(sqlDirectory, file);
      const sql = await readFile(filePath, 'utf8');

      try {
        await this.#pg.query(sql);
        console.log(`Executed ${file} successfully`);
      } catch (error) {
        console.error(`Error executing ${file}:`, error);

        setTimeout(() => {
          void (async () => {
            try {
              console.log(`Retrying ${file}...`);
              await this.#pg.query(sql);
              console.log(`Executed ${file} successfully`);
            } catch (error) {
              console.error(`Error executing ${file}:`, error);
            }
          })();
        }, 1000);
      }
    }
  }
}
