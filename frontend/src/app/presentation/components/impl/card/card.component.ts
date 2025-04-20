import { booleanAttribute, Component, input } from '@angular/core';

@Component({
  selector: 'game-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
  host: {
    '[class.horizontal]': 'horizontal()',
  },
})
export class CardComponent {
  public readonly horizontal = input(false, { transform: booleanAttribute });
}
