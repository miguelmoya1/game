import { Component, input } from '@angular/core';
import { TranslatePipe } from '@game/shared';
import { Effect } from '../../entities/effect.type';

@Component({
  selector: 'lib-effect',
  imports: [TranslatePipe],
  templateUrl: './effect.component.html',
  host: {
    class:
      'block border-b border-gray-600 p-4 pb-1 flex gap-2 justify-between items-center',
  },
  styles: [
    `
      :host:last-child {
        border-bottom: none !important;
      }
    `,
  ],
})
export class EffectComponent {
  public readonly effect = input.required<Effect>();
}
