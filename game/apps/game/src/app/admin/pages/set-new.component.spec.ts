import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetNewComponent } from './set-new.component';

describe('SetNewComponent', () => {
  let component: SetNewComponent;
  let fixture: ComponentFixture<SetNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SetNewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SetNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
