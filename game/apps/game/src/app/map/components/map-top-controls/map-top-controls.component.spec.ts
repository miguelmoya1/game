import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapTopControlsComponent } from './map-top-controls.component';

describe('MapTopControlsComponent', () => {
  let component: MapTopControlsComponent;
  let fixture: ComponentFixture<MapTopControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapTopControlsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MapTopControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
