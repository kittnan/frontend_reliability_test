import { TestBed } from '@angular/core/testing';

import { QueuesRevisesService } from './queues-revises.service';

describe('QueuesRevisesService', () => {
  let service: QueuesRevisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QueuesRevisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
