import { Component, input } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonDirective } from '../../../../shared/directives';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { EffectFormComponent } from '../effect-form/effect-form.component';

@Component({
  selector: 'game-effects-form',
  imports: [TranslatePipe, EffectFormComponent, FormsModule, ReactiveFormsModule, ButtonDirective],
  templateUrl: './effects-form.component.html',
  styleUrl: './effects-form.component.css',
})
export class EffectsFormComponent {
  public readonly effectsArray = input.required<FormArray>();
  protected addEffect() {
    this.effectsArray().push(this.#createEffectGroup());
  }

  protected removeEffect(index: number) {
    this.effectsArray().removeAt(index);
  }

  #createEffectGroup() {
    return new FormGroup({
      type: new FormControl(null),
      value: new FormControl(null, [Validators.pattern(/^-?\d*\.?\d+$/)]),
      target: new FormControl(null),
      stats: new FormControl(null),
      statsTarget: new FormControl(null),
      minimumItems: new FormControl(0, [Validators.required, Validators.min(0)]),
    });
  }
}
