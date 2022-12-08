/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApproveFunctionService } from './approve-function.service';

describe('Service: ApproveFunction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproveFunctionService]
    });
  });

  it('should ...', inject([ApproveFunctionService], (service: ApproveFunctionService) => {
    expect(service).toBeTruthy();
  }));
});
