import type { FastifyInstance } from 'fastify';

export const mockFastifyResponseParam = {
  get: () => {},
  post: () => {},
  put: () => {},
  patch: () => {},
  delete: () => {},
} as unknown as FastifyInstance;

const registerFnMock = (fn: (f: FastifyInstance) => void) => {
  fn(mockFastifyResponseParam);
};

export const fastifyMock = {
  register: registerFnMock,
  log: {
    debug: () => {},
  },
};
