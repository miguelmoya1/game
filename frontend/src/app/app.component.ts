import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsComponent } from '@game/components';
import { TRANSLATE_REPOSITORY } from '@game/repositories';
import { AUTH_USE_CASE, USER_USE_CASE } from '@game/use-cases';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'game-root',
  imports: [RouterOutlet, NotificationsComponent],
  template: `
    @if (translateLoaded()) {
      <router-outlet />

      <game-notifications />
    }
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
  readonly #translateService = inject(TranslateService);

  readonly #translateRepository = inject(TRANSLATE_REPOSITORY);
  readonly #authUseCase = inject(AUTH_USE_CASE);
  readonly #userUseCase = inject(USER_USE_CASE);

  protected readonly translateLoaded = signal(false);
  protected readonly showHeader = computed(() => {
    return this.#authUseCase.isAuthenticated.value();
  });

  constructor() {
    this.#loadLanguage();

    effect(() => {
      const user = this.#userUseCase.userLogged.value();

      if (user) {
        this.#loadLanguage(user.language);
      }
    });
  }

  async #loadLanguage(language = 'en') {
    this.#translateService.addLangs(['es', 'en']);
    this.#translateService.use(language);

    const translates = await this.#translateRepository.getTranslation();

    this.#translateService.setTranslation(
      this.#translateService.currentLang,
      {
        ...this.#translateService.translations[this.#translateService.currentLang],
        ...translates,
      },
      true,
    );

    this.translateLoaded.set(true);
  }
}
