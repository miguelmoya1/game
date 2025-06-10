import { Provider } from '@nestjs/common';
import { ITEM_REPOSITORY, ItemRepository, ItemRepositoryImpl } from '../../../core/infrastructure/repositories';

export const itemRepositoryProvider: Provider<ItemRepository> = {
  provide: ITEM_REPOSITORY,
  useClass: ItemRepositoryImpl,
};
