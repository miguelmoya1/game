import { Component, input, output } from '@angular/core';
import { ButtonDirective } from '../../../../shared/directives';
import { SearchEntity } from '../../../../shared/models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';

@Component({
  selector: 'game-search-card',
  imports: [ButtonDirective, TranslatePipe],
  templateUrl: './search-card.component.html',
  styleUrl: './search-card.component.css',
})
export class SearchCardComponent {
  public readonly search = input.required<SearchEntity>();

  public readonly onClickEdit = output<string>();
}
