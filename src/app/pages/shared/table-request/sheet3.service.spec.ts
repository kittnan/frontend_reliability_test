/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Sheet3Service } from './sheet3.service';

describe('Service: Sheet3', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Sheet3Service]
    });
  });

  it('should ...', inject([Sheet3Service], (service: Sheet3Service) => {
    expect(service).toBeTruthy();
  }));
});
