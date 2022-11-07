/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DialogAddService } from './dialog-add.service';

describe('Service: DialogAdd', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DialogAddService]
    });
  });

  it('should ...', inject([DialogAddService], (service: DialogAddService) => {
    expect(service).toBeTruthy();
  }));
});
