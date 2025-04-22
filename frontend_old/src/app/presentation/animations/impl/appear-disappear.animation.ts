import { animate, state, style, transition, trigger } from '@angular/animations';

export const appearAndDisappear = trigger('appearAndDisappear', [
  state('void', style({ opacity: 0 })),
  state('*', style({ opacity: 1 })),
  transition('void => *', animate('200ms ease-in')),
  transition('* => void', animate('200ms ease-out')),
]);
