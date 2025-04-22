import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardComponent } from '@game/shared/components/card/card.component';

@Component({
  selector: 'game-auth-layout',
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

    game-card {
      width: 100%;
      max-width: 400px;
    }
  `,
})
export class AuthLayoutComponent {}
