import { Component, inject } from '@angular/core';
import { PARTY_SERVICE } from '@game/features/party';
import { TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-party-page',
  standalone: true,
  templateUrl: './party-page.component.html',
  styleUrls: ['./party-page.component.css'],
  imports: [TranslatePipe],
})
export class PartyPageComponent {
  readonly partyService = inject(PARTY_SERVICE);

  readonly partyResource = this.partyService.party;
}
