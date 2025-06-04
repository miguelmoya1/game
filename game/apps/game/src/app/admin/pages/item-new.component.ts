import { Component } from '@angular/core';
import { CreateItemComponent } from '@game/features/items';

@Component({
  selector: 'game-admin-item-new',
  standalone: true,
  imports: [CreateItemComponent],
  template: ` <lib-create-item /> `,
})
export default class AdminItemNewComponent {}
