import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacologicalCategoriesFormComponent } from './pharmacological-categories-form.component';

describe('PharmacologicalCategoriesFormComponent', () => {
  let component: PharmacologicalCategoriesFormComponent;
  let fixture: ComponentFixture<PharmacologicalCategoriesFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PharmacologicalCategoriesFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PharmacologicalCategoriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
