import { TestBed } from '@angular/core/testing';

import { PharmacologicalCategoriesFormService } from './pharmacological-categories-form.service';

describe('PharmacologicalCategoriesFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PharmacologicalCategoriesFormService = TestBed.get(PharmacologicalCategoriesFormService);
    expect(service).toBeTruthy();
  });
});
