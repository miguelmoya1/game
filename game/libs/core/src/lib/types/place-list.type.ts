export type PlaceList = {
  id: string;
  lat: number;
  lng: number;
  permissions: {
    alreadyClaimed: boolean;
    canBeClaimed: boolean;
    canCreate: boolean;
    canDelete: boolean;
    canEdit: boolean;
  };
};
