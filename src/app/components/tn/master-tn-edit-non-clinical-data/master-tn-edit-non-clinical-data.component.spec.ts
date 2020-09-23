import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnEditNonClinicalDataComponent } from './master-tn-edit-non-clinical-data.component';

describe('MasterTnEditNonClinicalDataComponent', () => {
  let component: MasterTnEditNonClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnEditNonClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnEditNonClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnEditNonClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
