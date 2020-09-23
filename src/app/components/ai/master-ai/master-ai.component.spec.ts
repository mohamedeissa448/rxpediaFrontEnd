import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAiComponent } from './master-ai.component';

describe('MasterAiComponent', () => {
  let component: MasterAiComponent;
  let fixture: ComponentFixture<MasterAiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
