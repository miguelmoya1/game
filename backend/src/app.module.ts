import { AuthModule, TranslateModule, UsersModule } from '@game/controllers';
import { DatabaseModule } from '@game/database';
import { RepositoriesModule } from '@game/di/repositories';
import { UseCasesModule } from '@game/di/use-cases';
import { JwtAuthGuard } from '@game/guards';
import { CommandsModule, EventsModule, QueriesModule } from '@game/handlers';
import { ErrorsInterceptor } from '@game/interceptors';
import { ServicesModule } from '@game/services';
import { JwtStrategy } from '@game/strategies';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CqrsModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET'),
        signOptions: { expiresIn: '90d' },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
      global: true,
    }),
    DatabaseModule,
    RepositoriesModule,
    ServicesModule,
    UseCasesModule,

    CommandsModule,
    QueriesModule,
    EventsModule,

    AuthModule,
    UsersModule,
    TranslateModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    JwtStrategy,
  ],
})
export class AppModule {}
