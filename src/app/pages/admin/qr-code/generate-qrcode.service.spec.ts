import { TestBed } from '@angular/core/testing';

import { GenerateQrcodeService } from './generate-qrcode.service';

describe('GenerateQrcodeService', () => {
  let service: GenerateQrcodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateQrcodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
