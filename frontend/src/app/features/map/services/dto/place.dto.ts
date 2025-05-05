import { PlaceCategory } from '@game/shared/enums';
import { Item } from '../../../../shared/types';

export interface PlaceDto {
  id: string;
  apiId: string;
  name: string;
  lat: number;
  lng: number;
  categories: PlaceCategory[];
  currentItemId: string;
  permissions: {
    alreadyClaimed: boolean;
    canBeClaimed: boolean;
    canCreate: boolean;
    canDelete: boolean;
    canEdit: boolean;
  };
  // TODO: Add itemDto type
  currentItem: Item;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
