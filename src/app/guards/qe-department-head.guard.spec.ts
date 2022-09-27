import { TestBed } from '@angular/core/testing';

import { QeDepartmentHeadGuard } from './qe-department-head.guard';

describe('QeDepartmentHeadGuard', () => {
  let guard: QeDepartmentHeadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QeDepartmentHeadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
