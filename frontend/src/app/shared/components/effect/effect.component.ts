import { Component, input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { Effect } from '../../types';

@Component({
  selector: 'game-effect',
  imports: [TranslatePipe],
  templateUrl: './effect.component.html',
  styleUrl: './effect.component.css',
})
export class EffectComponent {
  public readonly effect = input.required<Effect>();
}
