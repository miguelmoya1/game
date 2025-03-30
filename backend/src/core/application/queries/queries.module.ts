import { Module } from '@nestjs/common';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { RehydrateHandler } from './handlers/rehydrate.handler';

@Module({
  providers: [GetUserByIdHandler, RehydrateHandler],
})
export class QueriesModule {}
