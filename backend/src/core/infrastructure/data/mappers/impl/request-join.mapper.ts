import { RequestJoinBuilder } from '@game/builder';
import { RequestJoinEntity } from '@game/entities';
import { RequestJoin, User } from '@prisma/client';
import { userToEntity } from './user.mapper';

type RequestJoinWithUser = {
  readonly requestJoin: RequestJoin;
  readonly UserInvited?: User;
};

export const requestJoinToEntity = ({ requestJoin, UserInvited }: RequestJoinWithUser): RequestJoinEntity => {
  let builder = new RequestJoinBuilder(requestJoin.createdAt, requestJoin.updatedAt)
    .withInviterId(requestJoin.inviterId)
    .withInvitedId(requestJoin.invitedId)
    .withProjectId(requestJoin.projectId);

  if (UserInvited) {
    builder = builder.withUserInvited(userToEntity(UserInvited));
  }

  return builder.build();
};
