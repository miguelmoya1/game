import { JoinedBuilder } from '@game/builder';
import { JoinedEntity } from '@game/entities';
import { Joined, User } from '@prisma/client';
import { userToEntity } from './user.mapper';

type Response = {
  User: User;
} & Joined;

export const joinedToEntity = (joined: Response): JoinedEntity => {
  return new JoinedBuilder(joined.createdAt, joined.updatedAt)
    .withUser(userToEntity(joined.User))
    .withRole(joined.role)
    .withInviterId(joined.inviterId)
    .withInvitedId(joined.invitedId)
    .withProjectId(joined.projectId)
    .build();
};
