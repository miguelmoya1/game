import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AUTH_GLOBAL_SERVICE, TranslateService } from '@game/core';
import { NotificationsComponent } from '@game/shared';

@Component({
  selector: 'game-root',
  standalone: true,
  imports: [RouterOutlet, NotificationsComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  readonly #translateService = inject(TranslateService);
  readonly #authService = inject(AUTH_GLOBAL_SERVICE);

  protected readonly showHeader = computed(() => {
    return this.#authService.isAuthenticated.value();
  });

  constructor() {
    this.#loadLanguage();

    effect(() => {
      const user = this.#authService.currentUser.value();
      if (user) {
        this.#loadLanguage(user.language);
      }
    });
  }

  async #loadLanguage(_language = 'en') {
    this.#translateService.setLanguage(_language);
  }
}
