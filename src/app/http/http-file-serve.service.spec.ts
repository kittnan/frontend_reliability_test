import { TestBed } from '@angular/core/testing';

import { HttpFileServeService } from './http-file-serve.service';

describe('HttpFileServeService', () => {
  let service: HttpFileServeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpFileServeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
