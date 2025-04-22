import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NotificationService } from '@game/core/services/notification.service';
import { TranslateService } from '@game/core/services/translate.service';
import { GameButtonDirective } from '@game/shared/directives/button.directive';
import { GameInputDirective } from '@game/shared/directives/input.directive';
import { TranslatePipe } from '@game/shared/pipes/translate.pipe';
import { AUTH_FACADE } from '../../services/auth.facade.contract';

@Component({
  selector: 'game-login',
  imports: [ReactiveFormsModule, GameButtonDirective, GameInputDirective, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  readonly #authFacade = inject(AUTH_FACADE);
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

    const result = await this.#authFacade.loginEmail({ email, password });

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
