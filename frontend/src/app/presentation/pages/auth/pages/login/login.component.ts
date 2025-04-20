import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GameButtonDirective, GameInputDirective } from '@game/directives';
import { NotificationService } from '@game/services';
import { AUTH_USE_CASE } from '@game/use-cases';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'game-login',
  imports: [ReactiveFormsModule, GameButtonDirective, GameInputDirective, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  readonly #authUseCase = inject(AUTH_USE_CASE);
  readonly #notificationService = inject(NotificationService);
  readonly #translateService = inject(TranslateService);

  protected readonly loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.loginForm.getRawValue() as { email: string; password: string };

    const result = await this.#authUseCase.login(email, password);

    if (result) {
      this.#notificationService.add(this.#translateService.instant('LOGIN.SUCCESS'), 'success');
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
