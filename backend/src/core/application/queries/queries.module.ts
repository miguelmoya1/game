import { Module } from '@nestjs/common';
import { GetItemByIdHandler } from './handlers/get-item-by-id.handler';
import { GetPlaceHandler } from './handlers/get-place.handler';
import { GetPlacesHandler } from './handlers/get-places.handler';
import { GetUserByIdHandler } from './handlers/get-user-by-id.handler';
import { RehydrateHandler } from './handlers/rehydrate.handler';

@Module({
  providers: [
    GetUserByIdHandler,
    RehydrateHandler,
    GetPlacesHandler,
    GetItemByIdHandler,
    GetPlaceHandler,
  ],
})
export class QueriesModule {}
