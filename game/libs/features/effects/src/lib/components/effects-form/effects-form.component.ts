import { Component, input } from '@angular/core';
import { FormArray, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonDirective, TranslatePipe } from '@game/shared';
import { getEmptyEffectForm } from '../../helpers/effect-form.helper';
import { EffectFormComponent } from '../effect-form/effect-form.component';

@Component({
  selector: 'lib-effects-form',
  imports: [
    TranslatePipe,
    EffectFormComponent,
    FormsModule,
    ReactiveFormsModule,
    ButtonDirective,
  ],
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
