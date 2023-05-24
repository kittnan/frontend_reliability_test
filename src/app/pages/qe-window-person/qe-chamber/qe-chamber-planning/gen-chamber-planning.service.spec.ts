import { TestBed } from '@angular/core/testing';

import { GenChamberPlanningService } from './gen-chamber-planning.service';

describe('GenChamberPlanningService', () => {
  let service: GenChamberPlanningService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenChamberPlanningService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
