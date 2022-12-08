/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Step5HttpService } from './step5-http.service';

describe('Service: Step5Http', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Step5HttpService]
    });
  });

  it('should ...', inject([Step5HttpService], (service: Step5HttpService) => {
    expect(service).toBeTruthy();
  }));
});
