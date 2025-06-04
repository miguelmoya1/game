import { Component } from '@angular/core';
import { CreateSetComponent } from '@game/features/sets';

@Component({
  selector: 'game-admin-set-new',
  standalone: true,
  imports: [CreateSetComponent],
  template: ` <lib-create-set /> `,
})
export default class AdminSetNewComponent {}
