/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApproveFormService } from './approve-form.service';

describe('Service: ApproveForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApproveFormService]
    });
  });

  it('should ...', inject([ApproveFormService], (service: ApproveFormService) => {
    expect(service).toBeTruthy();
  }));
});
