import { TestBed } from '@angular/core/testing';

import { ApproverHttpService } from './approver-http.service';

describe('ApproverHttpService', () => {
  let service: ApproverHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproverHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
