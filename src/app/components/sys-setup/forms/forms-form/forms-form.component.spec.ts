import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsFormComponent } from './forms-form.component';

describe('FormsFormComponent', () => {
  let component: FormsFormComponent;
  let fixture: ComponentFixture<FormsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
