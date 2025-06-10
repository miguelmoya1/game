import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectsFormComponent } from './effects-form.component';

describe('EffectsFormComponent', () => {
  let component: EffectsFormComponent;
  let fixture: ComponentFixture<EffectsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectsFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EffectsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
