import { Module } from '@nestjs/common';
import { LoginEmailCreatedHandler } from './impl/login-email-created.handler';

@Module({
  providers: [LoginEmailCreatedHandler],
})
export class EventsModule {}
