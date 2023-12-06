import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeRequestComponent } from './qr-code-request.component';

describe('QrCodeRequestComponent', () => {
  let component: QrCodeRequestComponent;
  let fixture: ComponentFixture<QrCodeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
