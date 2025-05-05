import { Component, input } from '@angular/core';
import { ItemEntity } from '../../models';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'game-item',
  imports: [TranslatePipe],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css',
})
export class ItemComponent {
  public readonly item = input.required<ItemEntity>();
}
