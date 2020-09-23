import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnPublishNonClinicalDataComponent } from './master-tn-publish-non-clinical-data.component';

describe('MasterTnPublishNonClinicalDataComponent', () => {
  let component: MasterTnPublishNonClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnPublishNonClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnPublishNonClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnPublishNonClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
