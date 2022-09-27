import { TestBed } from '@angular/core/testing';

import { QeEngineerGuard } from './qe-engineer.guard';

describe('QeEngineerGuard', () => {
  let guard: QeEngineerGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QeEngineerGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
