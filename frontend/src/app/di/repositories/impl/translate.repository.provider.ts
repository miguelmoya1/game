import { TRANSLATE_REPOSITORY } from '@game/interfaces';
import { TranslateRepositoryImpl } from '@game/repositories';

export const translateRepositoryProvider = {
  provide: TRANSLATE_REPOSITORY,
  useClass: TranslateRepositoryImpl,
};
