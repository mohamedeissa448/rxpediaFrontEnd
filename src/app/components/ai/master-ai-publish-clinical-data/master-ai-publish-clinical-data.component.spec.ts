import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAiPublishClinicalDataComponent } from './master-ai-publish-clinical-data.component';

describe('MasterAiPublishClinicalDataComponent', () => {
  let component: MasterAiPublishClinicalDataComponent;
  let fixture: ComponentFixture<MasterAiPublishClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAiPublishClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAiPublishClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
