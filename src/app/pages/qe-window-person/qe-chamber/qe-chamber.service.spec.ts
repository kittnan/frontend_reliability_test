import { TestBed } from '@angular/core/testing';

import { QeChamberService } from './qe-chamber.service';

describe('QeChamberService', () => {
  let service: QeChamberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QeChamberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
