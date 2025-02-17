import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  #logger = new Logger(DatabaseService.name);
  pg: Pool;

  constructor(private configService: ConfigService) {
    this.#logger.log('DatabaseService initialized');
    this.pg = new Pool({
      host: this.configService.get('DB_HOST') || 'localhost',
      port: this.configService.get('DB_PORT') || 5432,
      user: this.configService.get('DB_USER') || 'user',
      password: this.configService.get('DB_PASSWORD') || 'password',
      database: this.configService.get('DB_DATABASE') || 'database',
      max: 20,
    });

    this.connect();
  }

  async connect() {
    try {
      await this.pg.connect();
      this.#logger.log('Database connected successfully');
      const res = await this.pg.query('SELECT NOW()');

      this.#logger.log('Database time:', res.rows[0].now);
    } catch (error) {
      this.#logger.error('Database connection failed:', error);
    }
  }
}
