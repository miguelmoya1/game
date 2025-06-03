import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PartyApiService {
  readonly #baseUrl = 'parties';
  readonly #http = inject(HttpClient);

  async invite(playerId: string, partyId?: string) {
    await firstValueFrom(
      this.#http.post<void>(`${this.#baseUrl}/invite`, {
        playerId,
        partyId,
      }),
    );
  }

  async removeMember(partyId: string, playerId: string) {
    await firstValueFrom(
      this.#http.delete<void>(`${this.#baseUrl}/remove-member`, {
        body: {
          partyId,
          playerId,
        },
      }),
    );
  }

  async deleteParty(partyId: string) {
    await firstValueFrom(
      this.#http.delete<void>(`${this.#baseUrl}/${partyId}`),
    );
  }
}
