import { InjectionToken, Resource } from '@angular/core';
import { PlayerEntity } from '@game/features/player';
import { PartyEntity } from '../entities/party.entity';
import { PartyServiceImpl } from './party.service';

export interface PartyService {
  readonly party: Resource<PartyEntity | undefined>;
  readonly members: Resource<PlayerEntity[] | undefined>;

  invite(playerId: string, partyId?: string): Promise<void>;
  removeMember(partyId: string, playerId: string): Promise<void>;
  deleteParty(partyId: string): Promise<void>;
}

export const PARTY_SERVICE = new InjectionToken<PartyService>('PARTY_SERVICE', {
  providedIn: 'root',
  factory: () => new PartyServiceImpl(),
});
