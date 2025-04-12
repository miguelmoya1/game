import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { CommandsModule } from './core/application/commands';
import { EventsModule } from './core/application/events';
import { ErrorsInterceptor } from './core/application/interceptors';
import { QueriesModule } from './core/application/queries';
import { AuthGuard } from './core/infrastructure/guards';
import { RepositoriesModule } from './di/repositories';
import { ServicesModule } from './di/services';
import { UseCasesModule } from './di/use-cases';
import { AuthController } from './presentation/auth/auth.controller';
import { ItemsController } from './presentation/items/items.controller';
import { PlacesController } from './presentation/places/places.controller';
import { TranslateController } from './presentation/translate/translate.controller';
import { UsersController } from './presentation/users/users.controller';

@Module({
  imports: [
    RepositoriesModule,
    ServicesModule,
    UseCasesModule,

    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '90d' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
    }),

    CommandsModule,
    QueriesModule,
    EventsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
  ],
  controllers: [
    AuthController,
    UsersController,
    TranslateController,
    PlacesController,
    ItemsController,
  ],
})
export class AppModule {}
