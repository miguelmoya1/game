import { Injectable, OnModuleInit } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { TranslateFilesService } from './translate-files.service';

@Injectable()
export class TranslateService implements OnModuleInit {
  #languages: Record<
    string,
    {
      [key: string]: string;
    }
  >;
  readonly #languagesAvailable = ['es', 'en'];

  constructor(private readonly _translateFilesService: TranslateFilesService) {}

  async onModuleInit() {
    this.#languages = await this._translateFilesService.createAll(this.#languagesAvailable);
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
