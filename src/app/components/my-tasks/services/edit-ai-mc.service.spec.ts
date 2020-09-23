import { TestBed } from '@angular/core/testing';

import { EditAIMCService } from './edit-ai-mc.service';

describe('EditAIMCService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditAIMCService = TestBed.get(EditAIMCService);
    expect(service).toBeTruthy();
  });
});
