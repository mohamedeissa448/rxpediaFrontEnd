import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagingTasksComponent } from './managing-tasks.component';

describe('ManagingTasksComponent', () => {
  let component: ManagingTasksComponent;
  let fixture: ComponentFixture<ManagingTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagingTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagingTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
