import { Component, computed, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { EffectFormComponent } from '../effect-form/effect-form.component';

@Component({
  selector: 'game-set-form',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe, EffectFormComponent],
  templateUrl: './set-form.component.html',
  styleUrl: './set-form.component.css',
})
export class SetFormComponent {
  readonly setForm = input.required<FormGroup>();

  readonly name = computed(() => this.setForm().get('name'));

  readonly effects = computed(() => this.setForm().get('effects') as FormArray);

  protected addEffect() {
    this.effects().push(this.#createEffectGroup());
  }

  protected removeEffect(index: number) {
    this.effects().removeAt(index);
  }

  #createEffectGroup() {
    return new FormGroup({
      type: new FormControl(null),
      value: new FormControl(null, [Validators.pattern(/^-?\d*\.?\d+$/)]),
      target: new FormControl(null),
      stats: new FormControl(null),
      statsTarget: new FormControl(null),
      minimumItems: new FormControl(1, [Validators.required, Validators.min(1)]),
    });
  }
}
