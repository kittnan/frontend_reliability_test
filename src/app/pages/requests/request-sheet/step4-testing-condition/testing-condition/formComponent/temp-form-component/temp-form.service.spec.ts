import { TestBed } from '@angular/core/testing';

import { TempFormService } from './temp-form.service';

describe('TempFormService', () => {
  let service: TempFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TempFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
