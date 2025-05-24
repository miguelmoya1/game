import { Module } from '@nestjs/common';
import { CommandsModule } from 'src/core/application/commands';
import { ServicesModule } from 'src/di/services';
import { DataInitializationService } from './data-initialization.service';

@Module({
  imports: [ServicesModule, CommandsModule],
  providers: [DataInitializationService],
  exports: [DataInitializationService],
})
export class DataInitializationModule {}
