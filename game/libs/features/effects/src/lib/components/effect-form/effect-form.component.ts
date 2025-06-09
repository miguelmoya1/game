import { Component, input } from '@angular/core';
import {
  AbstractControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { StatsTarget, StatsType, TranslatePipe } from '@game/shared';
import { EffectTarget } from '../../enums/effect-target.enum';
import { EffectType } from '../../enums/effect-type.enum';

@Component({
  selector: 'lib-effect-form',
  imports: [FormsModule, ReactiveFormsModule, TranslatePipe],
  templateUrl: './effect-form.component.html',
  styleUrl: './effect-form.component.css',
})
export class EffectFormComponent {
  public readonly effectGroup = input.required<AbstractControl>();
  public readonly index = input.required<number>();

  protected readonly effectTypes = Object.values(EffectType);
  protected readonly effectTargets = Object.values(EffectTarget);
  protected readonly statsTypes = Object.values(StatsType);
  protected readonly statsTargets = Object.values(StatsTarget);
}
