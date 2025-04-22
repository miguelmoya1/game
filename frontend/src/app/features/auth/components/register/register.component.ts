import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GameButtonDirective } from '@game/shared/directives/button.directive';
import { GameInputDirective } from '@game/shared/directives/input.directive';
import { TranslatePipe } from '@game/shared/pipes/translate.pipe';
import { AccountProvider } from '../../data-access/dto/register.dto';
import { AUTH_FACADE } from '../../services/auth.facade.contract';

@Component({
  selector: 'game-register',
  imports: [TranslatePipe, ReactiveFormsModule, GameInputDirective, GameButtonDirective, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  readonly #authFacade = inject(AUTH_FACADE);

  protected readonly registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
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

    const { email, password } = this.registerForm.getRawValue() as { email: string; password: string };

    const result = await this.#authFacade.register({
      email,
      password,
      provider: AccountProvider.EMAIL,
      providerId: email,
    });

    if (result) {
      // Handle successful registration (e.g., navigate to login page or show success message)
      console.log('Registration successful!');
    }
  }
}
