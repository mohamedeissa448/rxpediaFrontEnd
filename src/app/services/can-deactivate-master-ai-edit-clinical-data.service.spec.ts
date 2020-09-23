import { TestBed } from '@angular/core/testing';

import { CanDeactivateServiceMasterAIEditClinicalData } from './can-deactivate-master-ai-edit-clinical-data.service';

describe('CanDeactivateServiceMasterAIEditClinicalData', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanDeactivateServiceMasterAIEditClinicalData = TestBed.get(CanDeactivateServiceMasterAIEditClinicalData);
    expect(service).toBeTruthy();
  });
});
