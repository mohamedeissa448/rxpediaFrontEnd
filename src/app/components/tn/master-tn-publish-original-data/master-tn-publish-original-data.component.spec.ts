import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterTnPublishOriginalDataComponent } from './master-tn-publish-original-data.component';

describe('MasterTnPublishOriginalDataComponent', () => {
  let component: MasterTnPublishOriginalDataComponent;
  let fixture: ComponentFixture<MasterTnPublishOriginalDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterTnPublishOriginalDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterTnPublishOriginalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
