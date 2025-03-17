import type { Pool } from 'pg';
import { SymbolRef } from '../../../../di/di-manager.ts';

export interface DatabaseService {
  readonly pg: Pool;

  connect(): Promise<void>;
}

export const DATABASE_SERVICE = new SymbolRef<DatabaseService>(Symbol('DATABASE_SERVICE'));
