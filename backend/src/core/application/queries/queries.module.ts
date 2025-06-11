import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../di/repositories';
import { ServicesModule } from '../../../di/services';
import { CheckEmailExistsHandler } from './auth/handler/check-email-exists.handler';
import { RehydrateHandler } from './auth/handler/rehydrate.handler';
import { GetDungeonDetailsHandler } from './dungeon/handlers/get-dungeon-details.handler';
import { GetInventoryForUserHandler } from './inventory/handlers/get-inventory-for-user.handler';
import { GetInventoryHandler } from './inventory/handlers/get-inventory.handler';
import { GetItemsHandler } from './item/handlers/get-items.handler';
import { GetPartyByIdHandler } from './party/handler/get-party-by-id.handler';
import { GetPartyByUserHandler } from './party/handler/get-party-by-user.handler';
import { GetPlaceHandler } from './place/handler/get-place.handler';
import { GetPlayerByIdHandler } from './player/handler/get-player-by-id.handler';
import { GetPlayerByUserIdHandler } from './player/handler/get-player-by-user-id.handler';
import { GetPointHandler } from './point/handler/get-point.handler';
import { GetPointsHandler } from './point/handler/get-points.handler';
import { SearchHandler } from './search/handler/search.handler';
import { GetSetsHandler } from './set/handler/get-sets.handler';
import { GetLanguageHandler } from './translate/handler/get-language.handler';
import { GetTranslateHandler } from './translate/handler/get-translates.handler';
import { GetUserByIdHandler } from './user/handler/get-user-by-id.handler';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [
    RehydrateHandler,
    CheckEmailExistsHandler,
    GetItemsHandler,
    GetPlaceHandler,

    GetUserByIdHandler,

    GetTranslateHandler,
    GetLanguageHandler,

    GetPlayerByIdHandler,
    GetPlayerByUserIdHandler,

    GetInventoryForUserHandler,
    GetInventoryHandler,

    GetSetsHandler,

    SearchHandler,

    GetPartyByIdHandler,
    GetPartyByUserHandler,

    GetPointsHandler,
    GetPointHandler,

    GetDungeonDetailsHandler,
  ],
})
export class QueriesModule {}
