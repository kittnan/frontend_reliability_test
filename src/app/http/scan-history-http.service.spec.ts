import { TestBed } from '@angular/core/testing';

import { ScanHistoryHttpService } from './scan-history-http.service';

describe('ScanHistoryHttpService', () => {
  let service: ScanHistoryHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScanHistoryHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
