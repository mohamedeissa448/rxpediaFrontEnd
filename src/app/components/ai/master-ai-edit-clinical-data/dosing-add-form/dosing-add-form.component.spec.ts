import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosingAddFormComponent } from './dosing-add-form.component';

describe('DosingAddFormComponent', () => {
  let component: DosingAddFormComponent;
  let fixture: ComponentFixture<DosingAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosingAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosingAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
