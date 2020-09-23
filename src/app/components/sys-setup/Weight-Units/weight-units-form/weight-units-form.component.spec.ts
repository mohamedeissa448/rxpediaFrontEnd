import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeightUnitsFormComponent } from './weight-units-form.component';

describe('WeightUnitsFormComponent', () => {
  let component: WeightUnitsFormComponent;
  let fixture: ComponentFixture<WeightUnitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeightUnitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeightUnitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
