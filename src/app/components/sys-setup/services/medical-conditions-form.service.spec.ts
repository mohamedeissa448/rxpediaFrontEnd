import { TestBed } from '@angular/core/testing';

import { MedicalConditionsFormService } from './medical-conditions-form.service';

describe('MedicalConditionsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MedicalConditionsFormService = TestBed.get(MedicalConditionsFormService);
    expect(service).toBeTruthy();
  });
});
