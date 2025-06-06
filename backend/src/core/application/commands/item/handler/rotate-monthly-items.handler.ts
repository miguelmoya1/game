import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import {
  ITEM_REPOSITORY,
  ItemRepository,
  PLACE_REPOSITORY,
  PlaceRepository,
} from '../../../../infrastructure/repositories';
import { RotateMonthlyItemsCommand } from '../impl/rotate-monthly-items.command';

@CommandHandler(RotateMonthlyItemsCommand)
export class RotateMonthlyItemsHandler
  implements ICommandHandler<RotateMonthlyItemsCommand>
{
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly itemRepository: ItemRepository,
    @Inject(PLACE_REPOSITORY) private readonly placeRepository: PlaceRepository,
  ) {}

  async execute() {
    const items = await this.itemRepository.getAll();
    if (!items.length) return;

    const places = (await this.placeRepository.getAll?.()) ?? [];
    if (!places.length) return;

    // TODO: comprobar le place category y que el item sea del mismo tipo
    for (const place of places) {
      const randomItem = items[Math.floor(Math.random() * items.length)];
      await this.placeRepository.updateCurrentItem?.(place.id, randomItem.id);
    }
  }
}
