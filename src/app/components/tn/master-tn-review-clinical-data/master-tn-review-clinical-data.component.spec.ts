import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnReviewClinicalDataComponent } from './master-tn-review-clinical-data.component';

describe('MasterTnReviewClinicalDataComponent', () => {
  let component: MasterTnReviewClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnReviewClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnReviewClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnReviewClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
