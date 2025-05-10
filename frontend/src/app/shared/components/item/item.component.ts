import { Component, input } from '@angular/core';
import { ItemEntity } from '../../models';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { EffectComponent } from '../effect/effect.component';
import { SetComponent } from '../set/set.component';

@Component({
  selector: 'game-item',
  imports: [TranslatePipe, EffectComponent, SetComponent],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  public readonly item = input.required<ItemEntity>();
}
