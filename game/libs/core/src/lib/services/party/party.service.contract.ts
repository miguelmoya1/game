import { InjectionToken, Resource } from '@angular/core';
import { PartyEntity } from '../../models/party.entity';
import { PartyServiceImpl } from './party.service';

export interface PartyService {
  readonly party: Resource<PartyEntity | undefined>;
  // party: Resource<any>; // httpResource result, type depends on implementation
  // getPartyByIdResource(partyId: string): unknown; // httpResource result
  // createParty(data: Partial<Party>): Observable<Party>;
  // addMember(partyId: string, playerId: string): any;
  // removeMember(partyId: string, playerId: string): any;
  // deleteParty(partyId: string): any;
  // getPartyById(partyId: string): Observable<Party>;
  // getPartyByPlayer(playerId: string): Observable<Party>;
  // getPartyMembers(partyId: string): Observable<unknown[]>;
}

export const PARTY_SERVICE = new InjectionToken<PartyService>('PARTY_SERVICE', {
  providedIn: 'root',
  factory: () => new PartyServiceImpl(),
});
