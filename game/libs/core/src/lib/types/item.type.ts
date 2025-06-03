import { Effect } from '@game/core';
import { ItemType } from '../enums/item.enum';
import { PlaceCategory } from '../enums/place-category.enum';
import { Rank } from '../enums/rank.enum';
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
  readonly effects?: Effect[] | null;
  readonly permissions: {
    readonly canCreate: boolean;
    readonly canEdit: boolean;
    readonly canDelete: boolean;
  };

  readonly stats?: Stats[] | null;

  readonly setId?: string | null;
};
