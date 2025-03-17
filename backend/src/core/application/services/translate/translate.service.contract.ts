import type { FastifyRequest } from 'fastify';
import { SymbolRef } from '../../../../di/di-manager.ts';

export interface TranslateService {
  getLanguages(): string[];
  get(language: string): Record<string, any>;
  getTranslate(req: FastifyRequest, language?: string): Record<string, any>;
}

export const TRANSLATE_SERVICE = new SymbolRef<TranslateService>(Symbol('TRANSLATE_SERVICE'));
