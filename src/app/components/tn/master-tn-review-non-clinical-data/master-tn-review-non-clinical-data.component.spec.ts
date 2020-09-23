import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnReviewNonClinicalDataComponent } from './master-tn-review-non-clinical-data.component';

describe('MasterTnReviewNonClinicalDataComponent', () => {
  let component: MasterTnReviewNonClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnReviewNonClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnReviewNonClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnReviewNonClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
