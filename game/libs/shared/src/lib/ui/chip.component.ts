import { Component } from '@angular/core';

@Component({
  selector: 'game-chip',
  template: ` <ng-content /> `,
  host: {
    class:
      'flex items-center justify-center px-3 py-1.5 text-xs font-medium rounded-full text-white border border-gray-700',
  },
})
export class ChipComponent {}
