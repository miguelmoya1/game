import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureItemsComponent } from './items.component';

describe('FeatureItemsComponent', () => {
  let component: FeatureItemsComponent;
  let fixture: ComponentFixture<FeatureItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
