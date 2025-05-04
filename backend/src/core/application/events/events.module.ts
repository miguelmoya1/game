import { Module } from '@nestjs/common';
import { RepositoriesModule } from '../../../di/repositories';
import { ServicesModule } from '../../../di/services';
import { UserCreatedHandler } from './handlers/user-created.handler';

@Module({
  imports: [RepositoriesModule, ServicesModule],
  providers: [UserCreatedHandler],
})
export class EventsModule {}
