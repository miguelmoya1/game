import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '@game/components';

@Component({
  selector: 'game-auth',
  imports: [RouterOutlet, CardComponent],
  template: `
    <game-card>
      <router-outlet />
    </game-card>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
    }
  `,
})
export class AuthComponent {}
