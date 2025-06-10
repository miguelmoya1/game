import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Place, PlaceEntity } from '../../../../domain/entities/impl/place.entity';
import {
  ITEM_REPOSITORY,
  ItemRepository,
  PLACE_REPOSITORY,
  PlaceRepository,
} from '../../../../infrastructure/repositories';
import { RotateMonthlyItemsCommand } from '../impl/rotate-monthly-items.command';

@CommandHandler(RotateMonthlyItemsCommand)
export class RotateMonthlyItemsHandler implements ICommandHandler<RotateMonthlyItemsCommand> {
  constructor(
    @Inject(ITEM_REPOSITORY) private readonly itemRepository: ItemRepository,
    @Inject(PLACE_REPOSITORY) private readonly placeRepository: PlaceRepository,
  ) {}

  async execute() {
    const items = await this.itemRepository.getAll();
    if (!items.length) {
      return;
    }

    const chunkSize = 500;
    let offset = 0;
    const totalPlaces = await this.placeRepository.getCount();

    while (offset < totalPlaces) {
      const places = await this.placeRepository.getAll(offset, chunkSize);

      if (!places.length) {
        break;
      }

      const updates = places
        .map((placeRaw) => {
          const place = PlaceEntity.create(placeRaw as Place);
          if (!place.categories || !place.categories.length) {
            return null;
          }

          const randomItem = place.getRandomMatchingItem(items);
          if (!randomItem) {
            return null;
          }

          return { id: placeRaw.id, currentItemId: randomItem.id };
        })
        .filter(Boolean) as { id: string; currentItemId: string }[];

      if (updates.length) {
        await this.placeRepository.updateMany(updates);
      }

      offset += chunkSize;
      await new Promise((res) => setTimeout(res, 100));
    }
  }
}
