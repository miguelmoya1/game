import { Global, Module } from '@nestjs/common';
import { accountUseCaseProvider } from './impl/account.use-case.provider';
import { UserUseCaseProvider } from './impl/user.use-case.provider';

const useCases = [accountUseCaseProvider, UserUseCaseProvider];

@Global()
@Module({
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
