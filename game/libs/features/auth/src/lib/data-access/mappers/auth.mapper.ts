export const tokenMapper = (value: unknown) => {
  if (typeof value !== 'object' || value === null) {
    throw new TypeError(
      'Invalid data structure received. Cannot map to token.',
    );
  }

  if (!('token' in value)) {
    throw new TypeError(
      'Invalid data structure received. Cannot map to token.',
    );
  }

  if (typeof (value as { token: string }).token !== 'string') {
    throw new TypeError(
      'Invalid data structure received. Cannot map to token.',
    );
  }

  return value.token as string;
};
