import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GameButtonDirective, GameInputDirective } from '@game/directives';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'game-register',
  imports: [TranslatePipe, ReactiveFormsModule, GameInputDirective, GameButtonDirective, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  protected readonly registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  protected onSubmit() {}
}
