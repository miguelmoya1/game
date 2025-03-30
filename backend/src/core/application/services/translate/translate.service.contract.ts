import type { FastifyRequest } from 'fastify';

export interface TranslateService {
  getLanguages(): string[];
  get(language: string): Record<string, string>;
  getTranslate(req: FastifyRequest, language?: string): Record<string, string>;
}

export const TRANSLATE_SERVICE = Symbol('TRANSLATE_SERVICE');
