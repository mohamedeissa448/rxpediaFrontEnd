import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAiClinicalComponent } from './edit-ai-clinical.component';

describe('EditAiClinicalComponent', () => {
  let component: EditAiClinicalComponent;
  let fixture: ComponentFixture<EditAiClinicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAiClinicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAiClinicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
