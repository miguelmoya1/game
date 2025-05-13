import { ItemType, PlaceCategory, Rank } from '../enums';
import { Effect } from '../types';
import { SetDto } from './set.dto';

export type ItemDto = {
  readonly id: string;
  readonly name: string;
  readonly description: string | null;
  readonly itemType: ItemType;
  readonly imageUrl: string | null;
  readonly effects?: Effect[] | null;
  readonly rank: Rank | null;
  readonly spawnCategories: PlaceCategory[];
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly permissions: {
    readonly canCreate: boolean;
    readonly canEdit: boolean;
    readonly canDelete: boolean;
  };
  readonly setId?: string | null;
  readonly set?: SetDto | null;
};
