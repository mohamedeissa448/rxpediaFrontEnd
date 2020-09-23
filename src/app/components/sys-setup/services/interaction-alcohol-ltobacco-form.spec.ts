import { TestBed } from '@angular/core/testing';

import { DosingAgeFormService } from './dosing-age-form.service';

describe('DosingAgeFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DosingAgeFormService = TestBed.get(DosingAgeFormService);
    expect(service).toBeTruthy();
  });
});
