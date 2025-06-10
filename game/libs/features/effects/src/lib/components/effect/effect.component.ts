import { Component, input } from '@angular/core';
import { TranslatePipe } from '@game/shared';
import { Effect } from '../../entities/effect.type';

@Component({
  selector: 'lib-effect',
  imports: [TranslatePipe],
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css',
})
export class EffectComponent {
  public readonly effect = input.required<Effect>();
}
