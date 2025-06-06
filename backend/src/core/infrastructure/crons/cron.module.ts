import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ItemsCrons } from './items.crons';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [ItemsCrons],
})
export class CronModule {}
