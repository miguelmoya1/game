import { Component, inject, input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ItemType, PlaceCategory, Rank } from '@game/core';
import { TranslatePipe } from '@game/shared';
import { SETS_SERVICE } from '../../services/sets.service.contract';
import { EffectsFormComponent } from '../effects-form/effects-form.component';

@Component({
  selector: 'game-item-form',
  imports: [
    TranslatePipe,
    FormsModule,
    ReactiveFormsModule,
    EffectsFormComponent,
  ],
  templateUrl: './item-form.component.html',
  styleUrl: './item-form.component.css',
})
export class ItemFormComponent {
  readonly #setService = inject(SETS_SERVICE);

  readonly itemForm = input.required<FormGroup>();

  readonly setsOptions = this.#setService.list;

  protected readonly itemTypes = Object.values(ItemType);
  protected readonly ranks = Object.values(Rank);
  protected readonly spawnCategoriesOptions = Object.values(PlaceCategory);

  get name() {
    return this.itemForm().get('name') as FormControl;
  }

  get description() {
    return this.itemForm().get('description') as FormControl;
  }

  get itemType() {
    return this.itemForm().get('itemType') as FormControl;
  }

  get imageUrl() {
    return this.itemForm().get('imageUrl') as FormControl;
  }

  get rank() {
    return this.itemForm().get('rank') as FormControl;
  }

  get spawnCategories() {
    return this.itemForm().get('spawnCategories') as FormControl;
  }

  get setId() {
    return this.itemForm().get('setId') as FormControl;
  }

  get effectsArray() {
    return this.itemForm().get('effects') as FormArray;
  }
}
