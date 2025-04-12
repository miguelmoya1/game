export enum ErrorCodes {
  CANNOT_ACTIVATE_ACCOUNT = 'CANNOT_ACTIVATE_ACCOUNT',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',

  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  ERROR_REGISTERING_USER = 'ERROR_REGISTERING_USER',
  USER_OR_PASSWORD_INVALID = 'USER_OR_PASSWORD_INVALID',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_NOT_CREATED = 'USER_NOT_CREATED',

  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  HASH_EXPIRED = 'HASH_EXPIRED',

  PLACE_NOT_FOUND = 'PLACE_NOT_FOUND',
  PLACE_NOT_CREATED = 'PLACE_NOT_CREATED',

  ITEM_NOT_FOUND = 'ITEM_NOT_FOUND',
}
