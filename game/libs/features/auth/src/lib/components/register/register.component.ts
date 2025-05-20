import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AccountProvider } from '@game/core';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { AUTH_SERVICE } from '../../services/auth.service.contract';

@Component({
  selector: 'game-register',
  imports: [TranslatePipe, ReactiveFormsModule, ButtonDirective, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly #authService = inject(AUTH_SERVICE);

  protected readonly registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  protected readonly passwordMatchValidator = () => {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  constructor() {
    this.registerForm.setValidators(this.passwordMatchValidator);
  }

  protected async onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password } = this.registerForm.getRawValue() as {
      email: string;
      password: string;
    };

    const result = await this.#authService.register({
      email,
      password,
      provider: AccountProvider.EMAIL,
      providerId: email,
    });

    if (result) {
      // TODO: Handle successful registration (e.g., navigate to login page or show success message)
      console.log('Registration successful!');
    }
  }
}
