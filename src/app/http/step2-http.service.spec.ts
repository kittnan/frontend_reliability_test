/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Step2HttpService } from './step2-http.service';

describe('Service: Step2Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Step2HttpService]
    });
  });

  it('should ...', inject([Step2HttpService], (service: Step2HttpService) => {
    expect(service).toBeTruthy();
  }));
});
