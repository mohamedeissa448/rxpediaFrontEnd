import { TestBed } from '@angular/core/testing';

import { VolumeUnitsFormService } from './volume-units-form.service';

describe('VolumeUnitsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VolumeUnitsFormService = TestBed.get(VolumeUnitsFormService);
    expect(service).toBeTruthy();
  });
});
