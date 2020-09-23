import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosingAgeFormComponent } from './dosing-age-form.component';

describe('DosingAgeFormComponent', () => {
  let component: DosingAgeFormComponent;
  let fixture: ComponentFixture<DosingAgeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosingAgeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosingAgeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
