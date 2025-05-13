import { Component, input } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective } from '../../../../shared/directives';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { getEmptyEffectForm } from '../../helpers/effect-form.helper';
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
    this.effectsArray().push(getEmptyEffectForm());
  }

  protected removeEffect(index: number) {
    this.effectsArray().removeAt(index);
  }
}
