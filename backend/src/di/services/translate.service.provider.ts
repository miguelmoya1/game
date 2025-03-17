import { TRANSLATE_SERVICE } from '../../core/application/services/translate/translate.service.contract.ts';
import { TranslateServiceImpl } from '../../core/application/services/translate/translate.service.ts';
import type { Provider } from '../di-manager.ts';

export const translateServiceProvider: Provider = {
  provide: TRANSLATE_SERVICE,
  useClass: TranslateServiceImpl,
};
