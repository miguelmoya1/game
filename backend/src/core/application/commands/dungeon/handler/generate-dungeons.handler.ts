import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RewardType } from 'src/core/domain/entities';
import { DungeonType, Rank } from '../../../../domain/enums';
import {
  DUNGEON_REPOSITORY,
  DungeonRepository,
  ITEM_REPOSITORY,
  ItemRepository,
  PLACE_REPOSITORY,
  PlaceRepository,
} from '../../../../infrastructure/repositories';
import { GenerateDungeonsCommand } from '../impl/generate-dungeons.command';

@CommandHandler(GenerateDungeonsCommand)
export class GenerateDungeonsHandler implements ICommandHandler<GenerateDungeonsCommand> {
  readonly #percentage = 0.05; // 5% of total places to generate dungeons

  constructor(
    @Inject(DUNGEON_REPOSITORY)
    private readonly dungeonRepository: DungeonRepository,
    @Inject(PLACE_REPOSITORY)
    private readonly placeRepository: PlaceRepository,
    @Inject(ITEM_REPOSITORY)
    private readonly itemRepository: ItemRepository,
  ) {}

  async execute() {
    const activePlaceIds = await this.dungeonRepository.getActiveDungeonPlaceIds();
    const totalPlaces = await this.placeRepository.getCount();
    const placesToGenerate = Math.floor(totalPlaces * this.#percentage) || 1;
    const placeIdsToGenerate = await this.placeRepository.getRandom(placesToGenerate, activePlaceIds);
    const randomRanked = Object.values(Rank)
      .sort(() => Math.random() - 0.5)
      .filter((rank) => rank === Rank.D || rank === Rank.C || rank === Rank.B || rank === Rank.A);

    const randomTypes = Object.values(DungeonType).sort(() => Math.random() - 0.5);

    const items = await this.itemRepository.getAll();

    for (const place of placeIdsToGenerate) {
      const rank = randomRanked[Math.floor(Math.random() * randomRanked.length)];
      const type = randomTypes[Math.floor(Math.random() * randomTypes.length)];
      const { id, lat, lng, categories } = place;

      const itemsSameCategory = items
        .filter((item) => item.rank === rank)
        .filter((item) => item.spawnCategories?.some((cat) => categories.includes(cat)));

      const rewardsCount = 1 + Math.floor(Math.random() * 3); // 1, 2 or 3
      const shuffled = itemsSameCategory.sort(() => Math.random() - 0.5);
      const rewards = shuffled.slice(0, Math.min(rewardsCount, shuffled.length)).map((item) => ({
        type: RewardType.Item,
        id: item.id,
      }));

      await this.dungeonRepository.create({
        placeId: id,
        lat,
        lng,
        rank,
        type,
        rewards,
      });
    }
  }
}
