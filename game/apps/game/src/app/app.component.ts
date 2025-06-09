import { Component, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AUTH_SERVICE } from '@game/features/auth';
import { NotificationsComponent, TRANSLATE_SERVICE } from '@game/shared';

@Component({
  selector: 'game-root',
  standalone: true,
  imports: [RouterOutlet, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly #translateService = inject(TRANSLATE_SERVICE);
  readonly #authService = inject(AUTH_SERVICE);

  protected readonly showHeader = computed(() => {
    return this.#authService.isAuthenticated.value();
  });

  constructor() {
    this.#loadLanguage();

    // TODO: FIX THIS
    // effect(() => {
    //   const user = this.#authService.currentUser.value();
    //   if (user) {
    //     this.#loadLanguage(user.language);
    //   }
    // });
  }

  async #loadLanguage(_language = 'en') {
    this.#translateService.setLanguage(_language);
  }
}
