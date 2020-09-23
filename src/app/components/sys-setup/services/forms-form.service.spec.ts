import { TestBed } from '@angular/core/testing';

import { FormsFormService } from './forms-form.service';

describe('FormsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormsFormService = TestBed.get(FormsFormService);
    expect(service).toBeTruthy();
  });
});
