export enum ErrorCodes {
  CANNOT_ACTIVATE_ACCOUNT = 'CANNOT_ACTIVATE_ACCOUNT',
  ACCOUNT_NOT_FOUND = 'ACCOUNT_NOT_FOUND',

  PROJECT_NOT_FOUND = 'PROJECT_NOT_FOUND',
  PROJECT_NOT_CREATED = 'PROJECT_NOT_CREATED',

  REQUEST_JOIN_NOT_DELETED = 'REQUEST_JOIN_NOT_DELETED',
  REQUEST_JOIN_NOT_CREATED = 'REQUEST_JOIN_NOT_CREATED',

  USER_ALREADY_EXISTS = 'USER_ALREADY_EXISTS',
  ERROR_REGISTERING_USER = 'ERROR_REGISTERING_USER',
  USER_OR_PASSWORD_INVALID = 'USER_OR_PASSWORD_INVALID',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_NOT_CREATED = 'USER_NOT_CREATED',

  USER_ALREADY_JOINED = 'USER_ALREADY_JOINED',
  CANT_REJECT_JOIN = 'CANT_REJECT_JOIN',
  CANT_JOIN_PROJECT = 'CANT_JOIN_PROJECT',
  CANT_UPDATE_JOIN = 'CANT_UPDATE_JOIN',

  USER_INVITED_NOT_FOUND = 'USER_INVITED_NOT_FOUND',
  USER_ALREADY_IN_PROJECT = 'USER_ALREADY_IN_PROJECT',

  USER_ALREADY_INVITED = 'USER_ALREADY_INVITED',
  ROUTE_NOT_FOUND = 'ROUTE_NOT_FOUND',
  ROUTES_NOT_FOUND = 'ROUTES_NOT_FOUND',

  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  UNAUTHORIZED = 'UNAUTHORIZED',
  HASH_EXPIRED = 'HASH_EXPIRED',

  API_KEY_NOT_PROVIDED = 'API_KEY_NOT_PROVIDED',

  ERROR_CREATING_API_KEY = 'ERROR_CREATING_API_KEY',
  PROJECT_NOT_UPDATED = 'PROJECT_NOT_UPDATED',
}
