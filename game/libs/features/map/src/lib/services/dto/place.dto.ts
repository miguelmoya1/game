import { PlaceCategory } from '@game/core';
import { ItemDto } from '@game/shared';

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
  currentItem: ItemDto;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
