import { ItemType, PlaceCategory, Rank } from '../../../../domain/enums';
import { Effect } from '../../../../domain/types';

export type CreateItemDataDto = {
  id?: string;
  name: string;
  description?: string;
  imageUrl?: string;
  rank?: Rank;
  itemType: ItemType;
  effects?: Effect[];
  spawnCategories?: PlaceCategory[];
  setId?: string;
};
