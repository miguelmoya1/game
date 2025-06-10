import { Provider } from '@nestjs/common';
import { TRANSLATE_SERVICE, TranslateService, TranslateServiceImpl } from '../../../core/application/services';

export const translateServiceProvider: Provider<TranslateService> = {
  provide: TRANSLATE_SERVICE,
  useClass: TranslateServiceImpl,
};
