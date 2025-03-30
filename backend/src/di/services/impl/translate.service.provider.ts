import { Provider } from '@nestjs/common';
import { TranslateServiceImpl } from '../../../core/application/services/translate/translate.service';
import {
  TRANSLATE_SERVICE,
  TranslateService,
} from '../../../core/application/services/translate/translate.service.contract';

export const translateServiceProvider: Provider<TranslateService> = {
  provide: TRANSLATE_SERVICE,
  useClass: TranslateServiceImpl,
};
