import { TestBed } from '@angular/core/testing';

import { OriginalTNService } from './original-tn.service';

describe('OriginalTNService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OriginalTNService = TestBed.get(OriginalTNService);
    expect(service).toBeTruthy();
  });
});
