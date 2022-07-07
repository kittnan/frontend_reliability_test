import { TestBed } from '@angular/core/testing';

import { ApproveGuard } from './approve.guard';

describe('ApproveGuard', () => {
  let guard: ApproveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ApproveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
