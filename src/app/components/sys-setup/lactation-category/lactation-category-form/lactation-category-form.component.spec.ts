import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DurationUnitsFormComponent } from "./duration-units-form.component";

describe("DosingAgeFormComponent", () => {
  let component: DurationUnitsFormComponent;
  let fixture: ComponentFixture<DurationUnitsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DurationUnitsFormComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationUnitsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
