import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PlacesCrons } from './places.crons';
import { DungeonsCrons } from './dungeons.crons';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [PlacesCrons, DungeonsCrons],
})
export class CronModule {}
