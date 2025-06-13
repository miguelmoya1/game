import { Component, input } from '@angular/core';
import { EffectComponent } from '@game/features/effects';
import { TextComponent, TitleComponent, TranslatePipe } from '@game/shared';
import { SetEntity } from '../../entities/set.entity';

@Component({
  selector: 'lib-set',
  imports: [EffectComponent, TranslatePipe, TitleComponent, TextComponent],
  templateUrl: './set.component.html',
  host: {
    class: 'block border border-gray-600 rounded-lg p-4',
  },
})
export class SetComponent {
  public readonly set = input.required<SetEntity>();
}
