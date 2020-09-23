import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InteractionEditFormComponent } from './interaction-edit-form.component';

describe('InteractionEditFormComponent', () => {
  let component: InteractionEditFormComponent;
  let fixture: ComponentFixture<InteractionEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InteractionEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InteractionEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
