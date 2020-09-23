import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAiReviewClinicalDataComponent } from './master-ai-review-clinical-data.component';

describe('MasterAiReviewClinicalDataComponent', () => {
  let component: MasterAiReviewClinicalDataComponent;
  let fixture: ComponentFixture<MasterAiReviewClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAiReviewClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAiReviewClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
