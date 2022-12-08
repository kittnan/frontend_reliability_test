/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Step1HttpService } from './step1-http.service';

describe('Service: Step1Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Step1HttpService]
    });
  });

  it('should ...', inject([Step1HttpService], (service: Step1HttpService) => {
    expect(service).toBeTruthy();
  }));
});
