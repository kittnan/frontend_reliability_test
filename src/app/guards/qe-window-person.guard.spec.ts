import { TestBed } from '@angular/core/testing';

import { QeWindowPersonGuard } from './qe-window-person.guard';

describe('QeWindowPersonGuard', () => {
  let guard: QeWindowPersonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QeWindowPersonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
