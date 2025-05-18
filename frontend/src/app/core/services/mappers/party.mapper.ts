import { Party } from '@game/shared/types';

export function mapPartyToEntity(data: any): Party {
  return {
    id: data.id,
    leaderId: data.leaderId,
    memberIds: data.memberIds,
    maxMembers: data.maxMembers,
    creationTime: data.creationTime,
    description: data.description,
    status: data.status,
  };
}
