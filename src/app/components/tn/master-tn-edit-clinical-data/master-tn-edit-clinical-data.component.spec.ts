import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnEditClinicalDataComponent } from './master-tn-edit-clinical-data.component';

describe('MasterTnEditClinicalDataComponent', () => {
  let component: MasterTnEditClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnEditClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnEditClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnEditClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
