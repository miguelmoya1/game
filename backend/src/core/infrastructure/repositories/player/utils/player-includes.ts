import { Prisma } from '@prisma/client';

export const playerItemInclude = {
  item: {
    include: {
      set: true,
    },
  },
};

export type PlayerIncludePayload = Prisma.PlayerItemGetPayload<{
  include: typeof playerItemInclude;
}>;
