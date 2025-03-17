import type { FastifyRequest } from 'fastify';
import { TranslateFilesService } from './translate-files.service.ts';
import type { TranslateService } from './translate.service.contract.ts';

export class TranslateServiceImpl implements TranslateService {
  readonly #languagesAvailable = ['es', 'en'];

  #languages: Record<string, any>;

  constructor() {
    this.init();
  }

  async init() {
    const translateFilesService = new TranslateFilesService();
    this.#languages = await translateFilesService.createAll(this.#languagesAvailable);
  }

  public getTranslate(req: FastifyRequest, language?: string) {
    if (language) {
      return this.#languages[language] || this.#languages['en'];
    }

    let lang = [...new Set(req.headers['accept-language']?.split(','))]?.[0]?.substring(0, 2).toLocaleLowerCase();

    if (!this.#languages[lang]) {
      lang = 'en';
    }

    return this.#languages[lang];
  }

  public getLanguages() {
    return this.#languagesAvailable;
  }

  public get(language: string) {
    return this.#languages[language];
  }
}
