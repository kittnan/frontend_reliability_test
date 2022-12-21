/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RejectService } from './reject.service';

describe('Service: Reject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RejectService]
    });
  });

  it('should ...', inject([RejectService], (service: RejectService) => {
    expect(service).toBeTruthy();
  }));
});
