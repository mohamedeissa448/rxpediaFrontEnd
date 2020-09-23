import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAiGrammerClinicalDataComponent } from './master-ai-grammer-clinical-data.component';

describe('MasterAiGrammerClinicalDataComponent', () => {
  let component: MasterAiGrammerClinicalDataComponent;
  let fixture: ComponentFixture<MasterAiGrammerClinicalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAiGrammerClinicalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAiGrammerClinicalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
