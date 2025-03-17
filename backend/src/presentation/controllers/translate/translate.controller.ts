import type { FastifyInstance, FastifyRequest } from 'fastify';
import { GetLanguageQuery } from '../../../core/domain/handlers/queries/get-language.query.ts';
import { GetLanguagesQuery } from '../../../core/domain/handlers/queries/get-languages.query.ts';
import { GetTranslateQuery } from '../../../core/domain/handlers/queries/get-translate.query.ts';
import { BaseController } from '../base.controller.ts';

export class TranslateController extends BaseController {
  readonly #getTranslateQuery = new GetTranslateQuery();
  readonly #getLanguageQuery = new GetLanguageQuery();
  readonly #getLanguagesQuery = new GetLanguagesQuery();

  constructor() {
    super('/translate');
  }

  protected initRoutes(fastify: FastifyInstance) {
    this.logger.debug('    GET /');
    fastify.get('/', this.getTranslate.bind(this));

    this.logger.debug('    GET /:language');
    fastify.get('/:language', this.getLanguage.bind(this));

    this.logger.debug('    GET /languages');
    fastify.get('/languages', this.getLanguages.bind(this));
  }

  async getTranslate(request: FastifyRequest) {
    return this.#getTranslateQuery.execute({ request });
  }

  async getLanguage(request: FastifyRequest) {
    const { language } = request.params as { language: string };

    return this.#getLanguageQuery.execute({ language });
  }

  async getLanguages() {
    return this.#getLanguagesQuery.execute();
  }
}
