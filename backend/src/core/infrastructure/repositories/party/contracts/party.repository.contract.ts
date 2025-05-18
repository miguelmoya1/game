import { CreatePartyDataDto } from '../../../../application/commands/party/dto/create-party-data.dto';
import { PartyEntity } from '../../../../domain/entities';

export interface PartyRepository {
  create(createPartyDto: CreatePartyDataDto): Promise<PartyEntity>;
  findById(partyId: string): Promise<PartyEntity | null>;
  addMember(partyId: string, playerId: string): Promise<void>;
  removeMember(partyId: string, playerId: string): Promise<void>;
  getPlayerIds(partyId: string): Promise<string[]>;
  findPartyByPlayer(playerId: string): Promise<PartyEntity | null>;
  delete(partyId: string): Promise<void>;
}

export const PARTY_REPOSITORY = Symbol('PARTY_REPOSITORY');
