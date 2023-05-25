import { TestBed } from '@angular/core/testing';

import { ApproveReviseFormService } from './approve-revise-form.service';

describe('ApproveReviseFormService', () => {
  let service: ApproveReviseFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApproveReviseFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
