import { TestBed } from '@angular/core/testing';

import { MyTaskService } from './my-task.service';

describe('MyTaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTaskService = TestBed.get(MyTaskService);
    expect(service).toBeTruthy();
  });
});
