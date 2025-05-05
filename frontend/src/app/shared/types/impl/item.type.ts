import { ItemType, PlaceCategory, Rank } from '../../enums';
import { Effect } from './effect.type';
import { Set } from './set.type';
import { Stats } from './stats.type';

export type Item = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly itemType: ItemType;
  readonly rank: Rank | null;
  readonly spawnCategories: PlaceCategory[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly imageUrl: string | null;
  readonly effect?: Effect[] | null;
  readonly permissions: {
    readonly canCreate: boolean;
    readonly canEdit: boolean;
    readonly canDelete: boolean;
  };

  readonly stats?: Stats[] | null;

  readonly setId?: string | null;
  readonly set?: Set | null;
};
