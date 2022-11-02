/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OperateItemsHttpService } from './operate-items-http.service';

describe('Service: OperateItemsHttp', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OperateItemsHttpService]
    });
  });

  it('should ...', inject([OperateItemsHttpService], (service: OperateItemsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
