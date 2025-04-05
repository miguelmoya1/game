import { Global, Module } from '@nestjs/common';
import { accountUseCaseProvider } from './impl/account.use-case.provider';
import { placeUseCaseProvider } from './impl/place.use-case.provider';
import { userUseCaseProvider } from './impl/user.use-case.provider';

const useCases = [
  accountUseCaseProvider,
  userUseCaseProvider,
  placeUseCaseProvider,
];

@Global()
@Module({
  providers: [...useCases],
  exports: [...useCases],
})
export class UseCasesModule {}
