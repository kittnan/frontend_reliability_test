import { TestBed } from '@angular/core/testing';

import { RequestSheetService } from './request-sheet.service';

describe('RequestSheetService', () => {
  let service: RequestSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
