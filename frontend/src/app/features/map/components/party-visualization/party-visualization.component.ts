import { Component, inject, signal } from '@angular/core';
import { PartyService } from '../../../../core/services/party.service';
import { ButtonDirective } from '../../../../shared/directives/impl/button.directive';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'game-party-visualization',
  templateUrl: './party-visualization.component.html',
  styleUrls: ['./party-visualization.component.css'],
  imports: [TranslatePipe, ButtonDirective],
})
export class PartyVisualizationComponent {
  readonly partyService = inject(PartyService);
  party = signal(this.partyService.party.value());

  onCreateParty() {
    // Aquí iría la lógica para crear un grupo (abrir modal, llamar a servicio, etc)
    // Por ahora solo un placeholder
    alert('Crear grupo (pendiente de implementar)');
  }
}
