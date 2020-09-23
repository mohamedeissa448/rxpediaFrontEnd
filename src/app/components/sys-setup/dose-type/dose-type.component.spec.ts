import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoseTypeComponent } from './dose-type.component';

describe('DosingAgeComponent', () => {
  let component: DoseTypeComponent;
  let fixture: ComponentFixture<DoseTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoseTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
