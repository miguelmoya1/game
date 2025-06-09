import { Effect } from '@game/features/effects';
import { PlaceCategory } from '@game/features/places';
import { Rank } from '@game/shared';
import { ItemType } from '../../enums/item.enum';

export type UpdateItemDto = {
  readonly name: string;
  readonly description?: string;
  readonly imageUrl?: string;
  readonly rank?: Rank;
  readonly itemType: ItemType;
  readonly effects: Effect[];
  readonly spawnCategories?: PlaceCategory[];
  readonly setId?: string;
};
