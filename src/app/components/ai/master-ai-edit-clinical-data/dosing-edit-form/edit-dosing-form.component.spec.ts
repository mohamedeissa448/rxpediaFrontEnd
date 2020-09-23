import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosingEditFormComponent } from './edit-dosing-form.component';

describe('DosingEditFormComponent', () => {
  let component: DosingEditFormComponent;
  let fixture: ComponentFixture<DosingEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosingEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosingEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
