import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnEditOriginalDataComponent } from './master-tn-edit-original-data.component';

describe('MasterTnEditOriginalDataComponent', () => {
  let component: MasterTnEditOriginalDataComponent;
  let fixture: ComponentFixture<MasterTnEditOriginalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnEditOriginalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnEditOriginalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
