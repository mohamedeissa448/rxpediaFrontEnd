import { TestBed } from '@angular/core/testing';

import { RoutesFormService } from './routes-form.service';

describe('RoutesFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoutesFormService = TestBed.get(RoutesFormService);
    expect(service).toBeTruthy();
  });
});
