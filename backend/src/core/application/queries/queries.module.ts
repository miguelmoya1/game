import { Module } from '@nestjs/common';
import { GetPlacesHandler } from './handlers/get-places.handler';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { RehydrateHandler } from './handlers/rehydrate.handler';

@Module({
  providers: [GetUserByIdHandler, RehydrateHandler, GetPlacesHandler],
})
export class QueriesModule {}
