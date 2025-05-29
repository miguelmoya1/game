import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorsInterceptor } from './core/application/interceptors';
import { SagasModule } from './core/application/sagas';
import { AuthGuard } from './core/infrastructure/guards';
import { DataInitializationModule } from './core/infrastructure/repositories/services/data.module';
import { PresentationModule } from './presentation/presentation.module';

@Module({
  imports: [
    DataInitializationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PresentationModule,
    SagasModule,
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
})
export class AppModule {}
