import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DosingAgeComponent } from './dosing-age.component';

describe('DosingAgeComponent', () => {
  let component: DosingAgeComponent;
  let fixture: ComponentFixture<DosingAgeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DosingAgeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DosingAgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
