import { TestBed } from '@angular/core/testing';

import { QeTechnicalGuard } from './qe-technical.guard';

describe('QeTechnicalGuard', () => {
  let guard: QeTechnicalGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(QeTechnicalGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
