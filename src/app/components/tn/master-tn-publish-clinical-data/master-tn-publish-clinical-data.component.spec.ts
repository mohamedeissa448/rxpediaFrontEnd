import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnPublishClinicalDataComponent } from './master-tn-publish-clinical-data.component';

describe('MasterTnPublishClinicalDataComponent', () => {
  let component: MasterTnPublishClinicalDataComponent;
  let fixture: ComponentFixture<MasterTnPublishClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnPublishClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnPublishClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
