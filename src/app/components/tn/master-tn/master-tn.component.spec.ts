import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnComponent } from './master-tn.component';

describe('MasterTnComponent', () => {
  let component: MasterTnComponent;
  let fixture: ComponentFixture<MasterTnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
