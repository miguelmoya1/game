import { Component } from '@angular/core';

@Component({
  selector: 'game-text',
  template: ` <ng-content /> `,
  host: {
    class: 'block text-left text-sm font-normal tracking-tight text-gray-400',
  },
})
export class TextComponent {}
