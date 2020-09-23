import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnReviewOriginalDataComponent } from './master-tn-review-original-data.component';

describe('MasterTnReviewOriginalDataComponent', () => {
  let component: MasterTnReviewOriginalDataComponent;
  let fixture: ComponentFixture<MasterTnReviewOriginalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnReviewOriginalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnReviewOriginalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
