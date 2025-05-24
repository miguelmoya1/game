import { InjectionToken, Resource } from '@angular/core';
import { PartyEntity } from '../../models/party.entity';
import { PlayerEntity } from '../../models/player.entity';
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
