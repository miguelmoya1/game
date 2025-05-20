import { Component, inject } from '@angular/core';
import { PARTY_SERVICE } from '@game/core';
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

  get party() {
    return this.partyService.party;
  }
}
