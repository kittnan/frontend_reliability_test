import { TestBed } from '@angular/core/testing';

import { TableRequestService } from './table-request.service';

describe('TableRequestService', () => {
  let service: TableRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TableRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
