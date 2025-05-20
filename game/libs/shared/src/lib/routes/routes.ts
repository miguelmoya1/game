const MAP_SEGMENT = 'map';
const INVENTORY_SEGMENT = 'inventory';
const AUTH_SEGMENT = 'auth';
const PARTY_SEGMENT = 'party';
const ADMIN_SEGMENT = 'admin';

export const APP_ROUTES = {
  ROOT: '/',
  AUTH: {
    ROOT: AUTH_SEGMENT,
    LOGIN: `${AUTH_SEGMENT}/login`,
    REGISTER: `${AUTH_SEGMENT}/register`,
  },
  MAP: {
    ROOT: MAP_SEGMENT,
    PLACE_LOCATION: {
      ROOT: ':placeId',
      BY_ID: (placeId: string) => `${MAP_SEGMENT}/${placeId}`,
    },
  },
  PARTY: {
    ROOT: PARTY_SEGMENT,
    PLACE_LOCATION: {
      ROOT: ':partyId',
      BY_ID: (partyId: string) => `${PARTY_SEGMENT}/${partyId}`,
    },
  },
  INVENTORY: {
    ROOT: INVENTORY_SEGMENT,
  },
  ADMIN: {
    ROOT: ADMIN_SEGMENT,
  },

  SETTINGS: 'settings',
  NOT_FOUND: '404',
};
