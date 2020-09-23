import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeUnitsComponent } from './volume-units.component';

describe('VolumeUnitsComponent', () => {
  let component: VolumeUnitsComponent;
  let fixture: ComponentFixture<VolumeUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
