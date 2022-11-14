import { TestBed } from '@angular/core/testing';

import { ChamberHttpService } from './chamber-http.service';

describe('ChamberHttpService', () => {
  let service: ChamberHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChamberHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
