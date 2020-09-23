import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalConditionsFormComponent } from './medical-conditions-form.component';

describe('MedicalConditionsFormComponent', () => {
  let component: MedicalConditionsFormComponent;
  let fixture: ComponentFixture<MedicalConditionsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicalConditionsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicalConditionsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
