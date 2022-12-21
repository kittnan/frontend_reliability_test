/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApproveService } from './approve.service';

describe('Service: Approve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproveService]
    });
  });

  it('should ...', inject([ApproveService], (service: ApproveService) => {
    expect(service).toBeTruthy();
  }));
});
