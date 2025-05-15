import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'game-auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="container">
      <router-outlet />
    </div>
  `,
  styles: `
    :host {
      display: flex;
      justify-content: center;
      align-items: center;

      width: 100%;
      height: 100%;
    }

    .container {
      border: 1px solid var(--color-border);
      padding: 2rem;
    }
  `,
})
export class AuthLayoutComponent {}
