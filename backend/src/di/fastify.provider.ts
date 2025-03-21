import { type FastifyInstance } from 'fastify';
import { SymbolRef } from './di-manager.ts';

export const FASTIFY = new SymbolRef<FastifyInstance>(Symbol('FASTIFY'));
