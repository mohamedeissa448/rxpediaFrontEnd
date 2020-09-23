import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionDataComponent } from './revision-data.component';

describe('RevisionDataComponent', () => {
  let component: RevisionDataComponent;
  let fixture: ComponentFixture<RevisionDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
