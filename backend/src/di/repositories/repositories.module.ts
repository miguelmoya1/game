import { Global, Module } from '@nestjs/common';
import { accountRepositoryProvider } from './impl/account.repository.provider';
import { userRepositoryProvider } from './impl/user.repository.provider';

const repositories = [accountRepositoryProvider, userRepositoryProvider];

@Global()
@Module({
  providers: [...repositories],
  exports: [...repositories],
})
export class RepositoriesModule {}
