import { TestBed } from '@angular/core/testing';

import { QeSectionGuard } from './qe-section.guard';

describe('QeSectionGuard', () => {
  let guard: QeSectionGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QeSectionGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
