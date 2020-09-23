import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAIEditClinicalDataComponent } from './master-ai-edit-clinical-data.component';

describe('EditAiClinicalComponent', () => {
  let component: MasterAIEditClinicalDataComponent;
  let fixture: ComponentFixture<MasterAIEditClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAIEditClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAIEditClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
