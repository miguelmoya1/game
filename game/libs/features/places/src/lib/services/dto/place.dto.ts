import { PlaceCategory } from '../../enums/place-category.enum';

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
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
