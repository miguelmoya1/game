import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '../core/application/commands';
import { EventsModule } from '../core/application/events';
import { QueriesModule } from '../core/application/queries';
import { AuthController } from './auth/auth.controller';
import { InventoryController } from './inventory/inventory.controller';
import { ItemsController } from './items/items.controller';
import { PartyController } from './party/party.controller';
import { PlacesController } from './places/places.controller';
import { PlayerController } from './player/places.controller';
import { SearchController } from './search/search.controller';
import { SetController } from './set/set.controller';
import { TranslateController } from './translate/translate.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [CqrsModule.forRoot(), CommandsModule, QueriesModule, EventsModule],
  controllers: [
    AuthController,
    InventoryController,
    ItemsController,
    PartyController,
    PlacesController,
    PlayerController,
    SearchController,
    SetController,
    TranslateController,
    UsersController,
  ],
})
export class PresentationModule {}
