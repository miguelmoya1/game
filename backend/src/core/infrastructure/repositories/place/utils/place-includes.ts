import { Prisma } from '@prisma/client';

export const placeInclude = {
  collectionLogs: true,
  currentItem: {
    include: {
      set: true,
    },
  },
};

export type PlaceIncludePayload = Prisma.PlaceGetPayload<{
  include: typeof placeInclude;
}>;

export const placeListInclude = {
  currentItem: {
    select: {
      id: true,
    },
  },
};

export type PlaceListIncludePayload = Prisma.PlaceGetPayload<{
  include: typeof placeListInclude;
}>;
