import { TestBed } from '@angular/core/testing';

import { LogFlowService } from './log-flow.service';

describe('LogFlowService', () => {
  let service: LogFlowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogFlowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
