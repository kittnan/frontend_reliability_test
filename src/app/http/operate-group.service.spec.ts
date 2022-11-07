/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OperateGroupService } from './operate-group.service';

describe('Service: OperateGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperateGroupService]
    });
  });

  it('should ...', inject([OperateGroupService], (service: OperateGroupService) => {
    expect(service).toBeTruthy();
  }));
});
