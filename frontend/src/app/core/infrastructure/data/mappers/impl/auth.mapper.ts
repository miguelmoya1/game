export const isAuthenticatedMapper = (value: unknown) => {
  const response = value as { isAuthenticated: boolean };

  return response.isAuthenticated;
};

export const tokenMapper = (value: unknown) => {
  const response = value as { token: string };

  return response.token;
};
