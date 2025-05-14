import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from '@game/shared/components/notifications/notifications.component';
import { AuthGlobalService } from './core/services/auth-global.service';

@Component({
  selector: 'game-root',
  imports: [RouterOutlet, NotificationsComponent],
  template: `
    <router-outlet />

    <game-notifications />
  `,
  styles: `
    :host {
      display: block;

      height: 100%;
      width: 100%;
    }
  `,
})
export class AppComponent {
  // readonly #translateService = inject(TranslateService);

  // readonly #translateRepository = inject(TRANSLATE_REPOSITORY);
  readonly #authService = inject(AuthGlobalService);

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
    // this.#translateService.addLangs(['es', 'en']);
    // this.#translateService.use(language);
    // const translates = await this.#translateRepository.getTranslation();
    // this.#translateService.setTranslation(
    //   this.#translateService.currentLang,
    //   {
    //     ...this.#translateService.translations[this.#translateService.currentLang],
    // ...translates,
    // },
    // true,
    // );
  }
}
