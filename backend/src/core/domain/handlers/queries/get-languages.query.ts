import { inject } from '../../../../di/di-manager.ts';
import { TRANSLATE_SERVICE } from '../../../application/services/translate/translate.service.contract.ts';

export class GetLanguagesQuery {
  readonly #translateService = inject(TRANSLATE_SERVICE);

  execute() {
    return this.#translateService.getLanguages();
  }
}
