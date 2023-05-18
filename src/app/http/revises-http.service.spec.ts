import { TestBed } from '@angular/core/testing';

import { RevisesHttpService } from './revises-http.service';

describe('RevisesHttpService', () => {
  let service: RevisesHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RevisesHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
