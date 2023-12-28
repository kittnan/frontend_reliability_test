import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodePreviewComponent } from './qr-code-preview.component';

describe('QrCodePreviewComponent', () => {
  let component: QrCodePreviewComponent;
  let fixture: ComponentFixture<QrCodePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodePreviewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
