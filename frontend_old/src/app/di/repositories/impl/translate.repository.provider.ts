import { TRANSLATE_REPOSITORY, TranslateRepositoryImpl } from '@game/repositories';

export const translateRepositoryProvider = {
  provide: TRANSLATE_REPOSITORY,
  useClass: TranslateRepositoryImpl,
};
