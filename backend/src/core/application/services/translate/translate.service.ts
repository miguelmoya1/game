import { Injectable, Logger } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { TranslateFilesService } from './translate-files.service';
import type { TranslateService } from './translate.service.contract';

@Injectable()
export class TranslateServiceImpl implements TranslateService {
  readonly #languagesAvailable = ['es', 'en'];
  readonly #logger = new Logger(TranslateServiceImpl.name);

  #languages: Record<string, any>;

  constructor() {
    this.init().catch((e) => {
      this.#logger.error(e);
    });
  }

  async init() {
    const translateFilesService = new TranslateFilesService();
    this.#languages = await translateFilesService.createAll(
      this.#languagesAvailable,
    );
  }

  public getTranslate(req: FastifyRequest, language?: string) {
    if (language) {
      return (this.#languages[language] || this.#languages['en']) as Record<
        string,
        string
      >;
    }

    let lang = [...new Set(req.headers['accept-language']?.split(','))]?.[0]
      ?.substring(0, 2)
      .toLocaleLowerCase();

    if (!this.#languages[lang]) {
      lang = 'en';
    }

    return this.#languages[lang] as Record<string, string>;
  }

  public getLanguages() {
    return this.#languagesAvailable;
  }

  public get(language: string) {
    return this.#languages[language] as Record<string, string>;
  }
}
