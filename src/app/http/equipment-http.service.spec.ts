import { TestBed } from '@angular/core/testing';

import { EquipmentHttpService } from './equipment-http.service';

describe('EquipmentHttpService', () => {
  let service: EquipmentHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipmentHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
