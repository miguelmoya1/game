import { Component, input } from '@angular/core';

type TitleType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

@Component({
  selector: 'game-title',
  host: {
    class: 'block text-left font-bold tracking-tight',
    '[class.text-4xl]': 'type() === "h1"',
    '[class.text-3xl]': 'type() === "h2"',
    '[class.text-2xl]': 'type() === "h3"',
    '[class.text-xl]': 'type() === "h4"',
    '[class.text-lg]': 'type() === "h5"',
    '[class.text-base]': 'type() === "h6"',
  },
  template: ` <ng-content /> `,
})
export class TitleComponent {
  public readonly type = input<TitleType>('h1');
}
