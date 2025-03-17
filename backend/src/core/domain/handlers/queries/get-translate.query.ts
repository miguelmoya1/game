import type { FastifyRequest } from 'fastify';
import { inject } from '../../../../di/di-manager.ts';
import { TRANSLATE_SERVICE } from '../../../application/services/translate/translate.service.contract.ts';

export interface GetTranslateQueryParams {
  request: FastifyRequest;
}

export class GetTranslateQuery {
  readonly #translateService = inject(TRANSLATE_SERVICE);

  execute(query: GetTranslateQueryParams) {
    return this.#translateService.getTranslate(query.request);
  }
}
