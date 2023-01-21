import { TestBed } from '@angular/core/testing';

import { UserApproveService } from './user-approve.service';

describe('UserApproveService', () => {
  let service: UserApproveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApproveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
