/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SetSubjectService } from './set-subject.service';

describe('Service: SetSubject', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetSubjectService]
    });
  });

  it('should ...', inject([SetSubjectService], (service: SetSubjectService) => {
    expect(service).toBeTruthy();
  }));
});
