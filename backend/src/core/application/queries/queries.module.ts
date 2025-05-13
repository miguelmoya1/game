import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../di/repositories';
import { ServicesModule } from '../../../di/services';
import { RehydrateHandler } from './auth/handler/rehydrate.handler';
import { GetInventoryForUserHandler } from './inventory/handlers/get-inventory-for-user.handler';
import { GetInventoryHandler } from './inventory/handlers/get-inventory.handler';
import { GetItemByIdHandler } from './item/handlers/get-item-by-id.handler';
import { GetPlaceHandler } from './place/handler/get-place.handler';
import { GetPlacesHandler } from './place/handler/get-places.handler';
import { GetPlayerByIdHandler } from './player/handler/get-player-by-id.handler';
import { GetPlayerByUserIdHandler } from './player/handler/get-player-by-user-id.handler';
import { SearchHandler } from './search/handler/search.handler';
import { GetSetByIdHandler } from './set/handler/get-set-by-id.handler';
import { GetSetListHandler } from './set/handler/get-set-list.handler';
import { GetLanguageHandler } from './translate/handler/get-language.handler';
import { GetTranslateHandler } from './translate/handler/get-translates.handler';
import { GetUserByIdHandler } from './user/handler/get-user-by-id.handler';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    RehydrateHandler,
    GetPlacesHandler,
    GetItemByIdHandler,
    GetPlaceHandler,

    GetUserByIdHandler,

    GetTranslateHandler,
    GetLanguageHandler,

    GetPlayerByIdHandler,
    GetPlayerByUserIdHandler,

    GetInventoryForUserHandler,
    GetInventoryHandler,

    GetSetListHandler,
    GetSetByIdHandler,

    SearchHandler,
  ],
})
export class QueriesModule {}
