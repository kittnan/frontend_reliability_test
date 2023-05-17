import { TestBed } from '@angular/core/testing';

import { DangerService } from './danger.service';

describe('DangerService', () => {
  let service: DangerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DangerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
