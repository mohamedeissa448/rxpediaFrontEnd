import { TestBed } from '@angular/core/testing';

import { SizeUnitsFormService } from './size-units-form.service';

describe('SizeUnitsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SizeUnitsFormService = TestBed.get(SizeUnitsFormService);
    expect(service).toBeTruthy();
  });
});
