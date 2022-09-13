import { TestBed } from '@angular/core/testing';

import { InspecTimeService } from './inspec-time.service';

describe('InspecTimeService', () => {
  let service: InspecTimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InspecTimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
