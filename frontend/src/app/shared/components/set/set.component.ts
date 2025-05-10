import { Component, input } from '@angular/core';
import { SetEntity } from '../../models';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { EffectComponent } from '../effect/effect.component';

@Component({
  selector: 'game-set',
  imports: [EffectComponent, TranslatePipe],
  templateUrl: './set.component.html',
  styleUrl: './set.component.css',
})
export class SetComponent {
  public readonly set = input.required<SetEntity>();
}
