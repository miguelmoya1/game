export interface PlaceDto {
  id: string;
  apiId: string;
  name: string;
  lat: number;
  lng: number;
  osmTags: Record<string, string> | null;
  categories: string[];
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}
