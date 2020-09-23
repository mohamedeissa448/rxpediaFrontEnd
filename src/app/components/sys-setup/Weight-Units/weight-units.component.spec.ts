import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitsComponent } from './weight-units.component';

describe('WeightUnitsComponent', () => {
  let component: WeightUnitsComponent;
  let fixture: ComponentFixture<WeightUnitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
