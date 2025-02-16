import { Injectable, Logger } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  #logger = new Logger(DatabaseService.name);
  pg: Pool;

  constructor() {
    this.#logger.log('DatabaseService initialized');
    this.pg = new Pool({
      host: 'database',
      port: 5432,
      user: 'user',
      password: 'password',
      database: 'database',
      max: 20,
    });

    this.connect();
  }

  async connect() {
    try {
      await this.pg.connect();
      this.#logger.log('Database connected successfully');
    } catch (error) {
      this.#logger.error('Database connection failed:', error);
    }
  }
}
