import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnGrammerClinicalDataComponent } from './master-tn-grammer-clinical-data.component';

describe('MasterTnGrammerClinicalDataComponent', () => {
  let component: MasterTnGrammerClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnGrammerClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnGrammerClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnGrammerClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
