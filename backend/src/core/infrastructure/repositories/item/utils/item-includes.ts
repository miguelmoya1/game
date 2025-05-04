import { Prisma } from '@prisma/client';

export const itemInclude = {
  set: true,
};

export type ItemIncludePayload = Prisma.ItemGetPayload<{
  include: typeof itemInclude;
}>;
