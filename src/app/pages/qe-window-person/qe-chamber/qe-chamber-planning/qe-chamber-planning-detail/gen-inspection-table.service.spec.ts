/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GenInspectionTableService } from './gen-inspection-table.service';

describe('Service: GenInspectionTable', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GenInspectionTableService]
    });
  });

  it('should ...', inject([GenInspectionTableService], (service: GenInspectionTableService) => {
    expect(service).toBeTruthy();
  }));
});
