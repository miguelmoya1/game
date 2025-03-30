import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CqrsModule } from '@nestjs/cqrs';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ErrorsInterceptor } from './core/application/interceptors';
import { RepositoriesModule } from './di/repositories';
import { ServicesModule } from './di/services';
import { UseCasesModule } from './di/use-cases';
import { AuthController } from './presentation/auth/auth.controller';
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

    // CommandsModule,
    // QueriesModule,
    // EventsModule,
  ],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    },
    // JwtStrategy,
  ],
  controllers: [AuthController, UsersController, TranslateController],
})
export class AppModule {}
