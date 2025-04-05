import { PrismaClient } from '@prisma/client';

export interface DatabaseService extends PrismaClient {
  onModuleInit(): Promise<void>;
}

export const DATABASE_SERVICE = Symbol('DATABASE_SERVICE');
