import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Party } from '@game/shared/types';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartyApiService {
  private readonly baseUrl = '/api/parties';

  constructor(private http: HttpClient) {}

  createParty(data: Partial<Party>): Observable<Party> {
    return this.http.post<Party>(`${this.baseUrl}`, data);
  }

  addMember(partyId: string, playerId: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${partyId}/members/${playerId}`, {});
  }

  removeMember(partyId: string, playerId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${partyId}/members/${playerId}`);
  }

  deleteParty(partyId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${partyId}`);
  }

  getPartyById(partyId: string): Observable<Party> {
    return this.http.get<Party>(`${this.baseUrl}/${partyId}`);
  }

  getPartyByPlayer(playerId: string): Observable<Party> {
    return this.http.get<Party>(`${this.baseUrl}/by-player/${playerId}`);
  }

  getPartyMembers(partyId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/${partyId}/members`);
  }
}
