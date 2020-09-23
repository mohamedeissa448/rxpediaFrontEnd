import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { PharmacologicalCategories } from "./pharmacological-categories.component";

describe("InboxComponent", () => {
  let component: PharmacologicalCategories;
  let fixture: ComponentFixture<PharmacologicalCategories>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacologicalCategories]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacologicalCategories);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
