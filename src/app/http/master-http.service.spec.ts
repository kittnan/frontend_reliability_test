import { TestBed } from '@angular/core/testing';

import { MasterHttpService } from './master-http.service';

describe('MasterHttpService', () => {
  let service: MasterHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MasterHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
