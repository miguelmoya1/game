import { ItemType, PlaceCategory, Rank } from '../../enums';
import { Effect } from './effect.type';
import { Set } from './set.type';
import { Stats } from './stats.type';

export type Item = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly itemType: ItemType;
  readonly imageUrl: string | null;
  readonly effect?: Effect[] | null;
  readonly rank: Rank | null;
  readonly spawnCategories: PlaceCategory[];

  readonly setId: string | null;
  readonly set?: Set | null;

  readonly stats?: Stats[] | null;

  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date | null;
};
