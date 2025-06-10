import { PartyEntity } from '../../../../domain/entities';
import { PartyStatus } from '../../../../domain/enums';

export interface PartyRepository {
  create(leaderId: string, status: PartyStatus, description?: string): Promise<PartyEntity>;
  findById(partyId: string): Promise<PartyEntity | null>;
  addMember(partyId: string, playerId: string): Promise<void>;
  removeMember(partyId: string, playerId: string): Promise<void>;
  getPlayerIds(partyId: string): Promise<string[]>;
  findPartyByPlayer(playerId: string): Promise<PartyEntity | null>;
  delete(partyId: string): Promise<void>;
}

export const PARTY_REPOSITORY = Symbol('PARTY_REPOSITORY');
