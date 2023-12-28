import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeChamberComponent } from './qr-code-chamber.component';

describe('QrCodeChamberComponent', () => {
  let component: QrCodeChamberComponent;
  let fixture: ComponentFixture<QrCodeChamberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeChamberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeChamberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
