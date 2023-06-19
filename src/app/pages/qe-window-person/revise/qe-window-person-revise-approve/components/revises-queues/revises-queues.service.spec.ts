/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RevisesQueuesService } from './revises-queues.service';

describe('Service: RevisesQueues', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RevisesQueuesService]
    });
  });

  it('should ...', inject([RevisesQueuesService], (service: RevisesQueuesService) => {
    expect(service).toBeTruthy();
  }));
});
