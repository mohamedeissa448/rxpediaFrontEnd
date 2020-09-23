import { TestBed } from '@angular/core/testing';

import { MasterTnService } from './master-tn.service';

describe('MasterTnService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterTnService = TestBed.get(MasterTnService);
    expect(service).toBeTruthy();
  });
});
