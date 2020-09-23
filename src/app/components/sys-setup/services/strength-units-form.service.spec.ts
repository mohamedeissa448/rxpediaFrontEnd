import { TestBed } from '@angular/core/testing';

import { StrengthUnitsFormService } from './strength-units-form.service';

describe('StrengthUnitsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StrengthUnitsFormService = TestBed.get(StrengthUnitsFormService);
    expect(service).toBeTruthy();
  });
});
