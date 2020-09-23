import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SizeUnitsFormComponent } from './size-units-form.component';

describe('SizeUnitsFormComponent', () => {
  let component: SizeUnitsFormComponent;
  let fixture: ComponentFixture<SizeUnitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SizeUnitsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SizeUnitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
