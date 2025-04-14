export const isAuthenticatedMapper = (value: unknown) => {
  if (typeof value !== 'object' || value === null) {
    return false;
  }
  if (!('isAuthenticated' in value)) {
    return false;
  }

  const isAuthenticated = value as { isAuthenticated: unknown };
  if (typeof isAuthenticated.isAuthenticated !== 'boolean') {
    return false;
  }

  return isAuthenticated.isAuthenticated;
};

export const tokenMapper = (value: unknown) => {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError('Invalid data structure received. Cannot map to token.');
  }

  if (!('token' in value)) {
    throw new TypeError('Invalid data structure received. Cannot map to token.');
  }

  if (typeof (value as { token: unknown }).token !== 'string') {
    throw new TypeError('Invalid data structure received. Cannot map to token.');
  }

  return value.token as string;
};
