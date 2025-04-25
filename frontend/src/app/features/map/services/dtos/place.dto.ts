import { PlaceCategory } from '@game/shared/enums';

export interface PlaceDto {
  id: string;
  apiId: string;
  name: string;
  lat: number;
  lng: number;
  osmTags: Record<string, string> | null;
  categories: PlaceCategory[];
  currentItemId: string;
  // TODO: Update this to the correct type
  currentItem: any;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
