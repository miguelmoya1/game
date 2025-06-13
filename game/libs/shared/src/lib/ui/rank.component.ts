import { Component, input } from '@angular/core';
import { Rank } from '../enums/rank.enum';

@Component({
  selector: 'game-rank',
  template: ` {{ rank() }} `,
  host: {
    class:
      'block text-center text-2xl font-bold text-white px-4 py-2 border-2 rounded-lg',
    '[class.border-red-800]': 'rank() === Rank.E',
    '[class.border-yellow-800]': 'rank() === Rank.D',
    '[class.border-green-800]': 'rank() === Rank.C',
    '[class.border-blue-800]': 'rank() === Rank.B',
    '[class.border-purple-800]': 'rank() === Rank.A',
    '[class.border-pink-800]': 'rank() === Rank.S',
    '[class.border-gray-800]': 'rank() === Rank.SS',
    '[class.border-white]': 'rank() === Rank.National',
    '[class.border-yellow-500]': 'rank() === Rank.International',
  },
})
export class RankComponent {
  public readonly rank = input.required<Rank>();
  protected readonly Rank = Rank;
}
