import { Provider } from '@nestjs/common';
import {
  ITEM_USE_CASE,
  ItemUseCase,
  ItemUseCaseImpl,
} from '../../../core/application/use-cases';

export const itemUseCaseProvider: Provider<ItemUseCase> = {
  provide: ITEM_USE_CASE,
  useClass: ItemUseCaseImpl,
};
