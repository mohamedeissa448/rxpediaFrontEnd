import { TestBed } from '@angular/core/testing';

import { WeightUnitsFormService } from './weight-units-form.service';

describe('WeightUnitsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeightUnitsFormService = TestBed.get(WeightUnitsFormService);
    expect(service).toBeTruthy();
  });
});
