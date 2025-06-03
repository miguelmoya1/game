import { Component, input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { EffectsFormComponent } from '@game/features/effects';
import { TranslatePipe } from '@game/shared';

@Component({
  selector: 'lib-set-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslatePipe,
    EffectsFormComponent,
  ],
  templateUrl: './set-form.component.html',
  styleUrl: './set-form.component.css',
})
export class SetFormComponent {
  readonly setForm = input.required<FormGroup>();

  get name() {
    return this.setForm().get('name') as FormControl;
  }

  get effects() {
    return this.setForm().get('effects') as FormArray;
  }
}
