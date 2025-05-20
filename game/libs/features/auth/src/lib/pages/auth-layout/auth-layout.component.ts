import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'game-auth-layout',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
})
export class AuthLayoutComponent {}
