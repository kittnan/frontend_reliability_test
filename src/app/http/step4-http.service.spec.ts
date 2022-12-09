/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Step4HttpService } from './step4-http.service';

describe('Service: Step4Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Step4HttpService]
    });
  });

  it('should ...', inject([Step4HttpService], (service: Step4HttpService) => {
    expect(service).toBeTruthy();
  }));
});
