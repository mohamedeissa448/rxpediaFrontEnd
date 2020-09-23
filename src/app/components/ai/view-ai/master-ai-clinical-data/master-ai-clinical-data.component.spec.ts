import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAiClinicalDataComponent } from './master-ai-clinical-data.component';

describe('MasterAiClinicalDataComponent', () => {
  let component: MasterAiClinicalDataComponent;
  let fixture: ComponentFixture<MasterAiClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAiClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAiClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
