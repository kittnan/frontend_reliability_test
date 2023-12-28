import { TestBed } from '@angular/core/testing';

import { TrackingOperateHttpService } from './tracking-operate-http.service';

describe('TrackingOperateHttpService', () => {
  let service: TrackingOperateHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TrackingOperateHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
