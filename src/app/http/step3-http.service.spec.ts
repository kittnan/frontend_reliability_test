/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Step3HttpService } from './step3-http.service';

describe('Service: Step3Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Step3HttpService]
    });
  });

  it('should ...', inject([Step3HttpService], (service: Step3HttpService) => {
    expect(service).toBeTruthy();
  }));
});
