import { Component, inject } from '@angular/core';
import { PARTY_SERVICE } from '@game/core';
import { TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-party-visualization',
  templateUrl: './party-visualization.component.html',
  styleUrls: ['./party-visualization.component.css'],
  imports: [TranslatePipe],
})
export class PartyVisualizationComponent {
  readonly partyService = inject(PARTY_SERVICE);

  readonly partyResource = this.partyService.party;
}
