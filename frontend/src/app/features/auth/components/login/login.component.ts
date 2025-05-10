import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonDirective, InputDirective } from '@game/shared/directives';
import { TranslatePipe } from '@game/shared/pipes/translate.pipe';
import { AUTH_SERVICE } from '../../services/auth.service.contract';

@Component({
  selector: 'game-login',
  imports: [ReactiveFormsModule, ButtonDirective, InputDirective, TranslatePipe, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  readonly #authService = inject(AUTH_SERVICE);
  readonly #router = inject(Router);

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

    const result = await this.#authService.loginEmail({ email, password });

    if (result) {
      await this.#router.navigate(['/map']);
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
