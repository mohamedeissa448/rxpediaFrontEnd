import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AIViewComponent } from './view.component';

describe('ViewComponent', () => {
  let component: AIViewComponent;
  let fixture: ComponentFixture<AIViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AIViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AIViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
