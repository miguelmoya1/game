import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AccountProvider, AUTH_SERVICE } from '@game/features/auth';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { catchError, debounceTime, first, map, switchMap } from 'rxjs';

@Component({
  selector: 'game-register',
  imports: [TranslatePipe, ReactiveFormsModule, ButtonDirective, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  readonly #authService = inject(AUTH_SERVICE);
  readonly #router = inject(Router);

  protected readonly registerForm = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
    confirmPassword: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });

  protected readonly passwordMatchValidator = () => {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  };

  constructor() {
    this.registerForm.setValidators(this.passwordMatchValidator);
    this.registerForm
      .get('email')
      ?.addAsyncValidators(this.emailExistsValidator());
  }

  private emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl) => {
      return control.valueChanges.pipe(
        debounceTime(400),
        switchMap((email: string) => this.#authService.checkEmailExists(email)),
        map((exists: boolean) => (exists ? { emailTaken: true } : null)),
        catchError(() => [null]),
        first(),
      );
    };
  }

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  protected async onSubmit() {
    if (!this.registerForm.valid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { email, password, name } = this.registerForm.getRawValue();

    const result = await this.#authService.register({
      email,
      name,
      password,
      provider: AccountProvider.EMAIL,
      providerId: email,
    });

    if (result) {
      this.#router.navigate(['/auth/login']);
      // TODO: Handle successful registration (e.g., navigate to login page or show success message)
      console.log('Registration successful!');
    }
  }
}
