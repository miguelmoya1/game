import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EffectFormComponent } from './effect-form.component';

describe('EffectFormComponent', () => {
  let component: EffectFormComponent;
  let fixture: ComponentFixture<EffectFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EffectFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EffectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
