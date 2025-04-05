import { Global, Module } from '@nestjs/common';
import { accountRepositoryProvider } from './impl/account.repository.provider';
import { placeApiHistoryRepositoryProvider } from './impl/place-api-history.repository.provider';
import { placeApiRepositoryProvider } from './impl/place-api.repository.provider';
import { placeRepositoryProvider } from './impl/place.repository.provider';
import { userRepositoryProvider } from './impl/user.repository.provider';

const repositories = [
  placeApiHistoryRepositoryProvider,
  placeApiRepositoryProvider,
  accountRepositoryProvider,
  placeRepositoryProvider,
  userRepositoryProvider,
];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
