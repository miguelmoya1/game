import { PartyEntity } from '../../entities/party.entity';
import { PartyDto } from '../dto/party.dto';

const isPartyDto = (data: unknown): data is PartyDto => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const partyDto = data as PartyDto;

  return (
    typeof partyDto.id === 'string' &&
    typeof partyDto.leaderId === 'string' &&
    Array.isArray(partyDto.memberIds) &&
    typeof partyDto.maxMembers === 'number' &&
    partyDto.creationTime instanceof Date &&
    (partyDto.description === undefined ||
      typeof partyDto.description === 'string')
  );
};

export function mapPartyToEntity(data: unknown) {
  if (!isPartyDto(data)) {
    throw new TypeError('Invalid PartyDto');
  }

  return PartyEntity.create({
    id: data.id,
    leaderId: data.leaderId,
    memberIds: data.memberIds,
    maxMembers: data.maxMembers,
    creationTime: data.creationTime,
    description: data.description,
    status: data.status,
  });
}
