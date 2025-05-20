import { Component, input, output } from '@angular/core';
import { SearchEntity } from '@game/core';
import { ButtonDirective, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-search-card',
  imports: [ButtonDirective, TranslatePipe],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css',
})
export class SearchCardComponent {
  public readonly search = input.required<SearchEntity>();

  public readonly editClicked = output<string>();
  public readonly deleteClicked = output<string>();
}
