import { Prisma } from '@prisma/client';

export const itemForPlaceInclude = {
  set: true,
};

export type ItemForPlaceIncludePayload = Prisma.ItemGetPayload<{
  include: typeof itemForPlaceInclude;
}>;
