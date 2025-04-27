import { Global, Module } from '@nestjs/common';
import { accountRepositoryProvider } from './impl/account.repository.provider';
import { itemRepositoryProvider } from './impl/item.repository.provider';
import { placeApiHistoryRepositoryProvider } from './impl/place-api-history.repository.provider';
import { placeApiRepositoryProvider } from './impl/place-api.repository.provider';
import { placeRepositoryProvider } from './impl/place.repository.provider';
import { playerItemCollectionLogRepositoryProvider } from './impl/player-item-collection-log.repository.provider';
import { userRepositoryProvider } from './impl/user.repository.provider';

const repositories = [
  playerItemCollectionLogRepositoryProvider,
  placeApiHistoryRepositoryProvider,
  placeApiRepositoryProvider,
  accountRepositoryProvider,
  placeRepositoryProvider,
  userRepositoryProvider,
  itemRepositoryProvider,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
