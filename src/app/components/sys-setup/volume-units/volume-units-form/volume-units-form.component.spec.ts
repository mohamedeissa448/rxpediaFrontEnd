import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeUnitsFormComponent } from './volume-units-form.component';

describe('VolumeUnitsFormComponent', () => {
  let component: VolumeUnitsFormComponent;
  let fixture: ComponentFixture<VolumeUnitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeUnitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeUnitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
