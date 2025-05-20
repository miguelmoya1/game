import { Component, inject, signal } from '@angular/core';
import { PARTY_SERVICE } from '@game/core';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-party-visualization',
  templateUrl: './party-visualization.component.html',
  styleUrls: ['./party-visualization.component.css'],
  imports: [TranslatePipe, ButtonDirective],
})
export class PartyVisualizationComponent {
  readonly partyService = inject(PARTY_SERVICE);
  party = signal(this.partyService.party.value());

  onCreateParty() {
    // Aquí iría la lógica para crear un grupo (abrir modal, llamar a servicio, etc)
    // Por ahora solo un placeholder
    alert('Crear grupo (pendiente de implementar)');
  }
}
