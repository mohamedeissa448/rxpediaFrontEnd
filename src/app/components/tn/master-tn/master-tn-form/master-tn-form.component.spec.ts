import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnFormComponent } from './master-tn-form.component';

describe('MasterTnFormComponent', () => {
  let component: MasterTnFormComponent;
  let fixture: ComponentFixture<MasterTnFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
