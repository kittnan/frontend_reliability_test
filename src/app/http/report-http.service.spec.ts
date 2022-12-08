/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ReportHttpService } from './report-http.service';

describe('Service: ReportHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReportHttpService]
    });
  });

  it('should ...', inject([ReportHttpService], (service: ReportHttpService) => {
    expect(service).toBeTruthy();
  }));
});
