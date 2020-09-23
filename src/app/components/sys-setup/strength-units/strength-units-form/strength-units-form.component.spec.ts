import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrengthUnitsFormComponent } from './strength-units-form.component';

describe('StrengthUnitsFormComponent', () => {
  let component: StrengthUnitsFormComponent;
  let fixture: ComponentFixture<StrengthUnitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrengthUnitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrengthUnitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
