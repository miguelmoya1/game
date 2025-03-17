import { inject } from '../../../../di/di-manager.ts';
import { TRANSLATE_SERVICE } from '../../../application/services/translate/translate.service.contract.ts';

export interface GetLanguageQueryParams {
  language: string;
}

export class GetLanguageQuery {
  readonly #translateService = inject(TRANSLATE_SERVICE);

  execute(query: GetLanguageQueryParams) {
    return this.#translateService.get(query.language);
  }
}
