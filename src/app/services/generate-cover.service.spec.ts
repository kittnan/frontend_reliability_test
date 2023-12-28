import { TestBed } from '@angular/core/testing';

import { GenerateCoverService } from './generate-cover.service';

describe('GenerateCoverService', () => {
  let service: GenerateCoverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateCoverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
