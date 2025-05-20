import { Party } from '../../types/party.type';

// TODO: Add a dto (unknown and check if the object is a PartyDto)
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
