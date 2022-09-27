import { TestBed } from '@angular/core/testing';

import { QeSectionHeadGuard } from './qe-section-head.guard';

describe('QeSectionHeadGuard', () => {
  let guard: QeSectionHeadGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QeSectionHeadGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
