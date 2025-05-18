import { Component, inject } from '@angular/core';
import { PartyService } from '../../../core/services/party.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'game-party-page',
  standalone: true,
  templateUrl: './party-page.component.html',
  styleUrls: ['./party-page.component.css'],
  imports: [TranslatePipe],
})
export class PartyPageComponent {
  readonly partyService = inject(PartyService);
  get party() {
    return this.partyService.party;
  }
}
