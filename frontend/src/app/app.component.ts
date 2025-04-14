import { Component, computed, effect, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TRANSLATE_REPOSITORY } from '@game/repositories';
import { AUTH_USE_CASE, USER_USE_CASE } from '@game/use-cases';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'game-root',
  imports: [RouterOutlet],
  template: ` <router-outlet /> `,
  styles: `
    :host {
      display: block;

      height: 100%;
      width: 100%;

      background-color: #f0f0f0;
    }
  `,
})
export class AppComponent {
  readonly #translateService = inject(TranslateService);

  readonly #translateRepository = inject(TRANSLATE_REPOSITORY);
  readonly #authUseCase = inject(AUTH_USE_CASE);
  readonly #userUseCase = inject(USER_USE_CASE);

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
  }
}
