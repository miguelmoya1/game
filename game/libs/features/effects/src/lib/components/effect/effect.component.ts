import { Component, input } from '@angular/core';
import { Effect } from '@game/core';
import { TranslatePipe } from '@game/shared';

@Component({
  selector: 'lib-effect',
  imports: [TranslatePipe],
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css',
})
export class EffectComponent {
  public readonly effect = input.required<Effect>();
}
