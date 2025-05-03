import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandsModule } from '../core/application/commands';
import { EventsModule } from '../core/application/events';
import { QueriesModule } from '../core/application/queries';
import { AuthController } from './auth/auth.controller';
import { ItemsController } from './items/items.controller';
import { PlacesController } from './places/places.controller';
import { PlayerController } from './player/places.controller';
import { TranslateController } from './translate/translate.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [CqrsModule.forRoot(), CommandsModule, QueriesModule, EventsModule],
  controllers: [
    AuthController,
    ItemsController,
    PlacesController,
    PlayerController,
    TranslateController,
    UsersController,
  ],
})
export class PresentationModule {}
