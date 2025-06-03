import { Component, input } from '@angular/core';
import { EffectComponent, TranslatePipe } from '@game/shared';
import { SetEntity } from '../../entities/set.entity';

@Component({
  selector: 'lib-set',
  imports: [EffectComponent, TranslatePipe],
  templateUrl: './set.component.html',
  styleUrl: './set.component.css',
})
export class SetComponent {
  public readonly set = input.required<SetEntity>();
}
