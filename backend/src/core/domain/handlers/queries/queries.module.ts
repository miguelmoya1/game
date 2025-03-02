import { Module } from '@nestjs/common';
import { GetUserByIdHandler } from './impl/get-user-by-id.handler';
import { RehydrateHandler } from './impl/rehydrate.handler';

@Module({
  providers: [GetUserByIdHandler, RehydrateHandler],
})
export class QueriesModule {}
