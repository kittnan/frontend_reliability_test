import { TestBed } from '@angular/core/testing';

import { UserApproveHttpService } from './user-approve-http.service';

describe('UserApproveHttpService', () => {
  let service: UserApproveHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserApproveHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
