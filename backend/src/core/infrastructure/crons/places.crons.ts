import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { RotateMonthlyItemsCommand } from '../../application/commands';

@Injectable()
export class PlacesCrons {
  readonly #logger = new Logger(PlacesCrons.name);
  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  async handleMonthlyItemRotation() {
    this.#logger.debug('Monthly item rotation started');
    await this.commandBus.execute(new RotateMonthlyItemsCommand());
    this.#logger.debug('Monthly item rotation completed');
  }
}
