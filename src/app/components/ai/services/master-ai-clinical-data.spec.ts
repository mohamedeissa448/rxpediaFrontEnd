import { TestBed } from '@angular/core/testing';

import { MasterAIEditClinicalDataService } from './master-ai-clinical-data.service';

describe('MasterAIEditClinicalDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterAIEditClinicalDataService = TestBed.get(MasterAIEditClinicalDataService);
    expect(service).toBeTruthy();
  });
});
