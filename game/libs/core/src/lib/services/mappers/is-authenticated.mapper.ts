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
