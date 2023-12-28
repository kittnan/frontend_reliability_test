import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QrCodeOperateComponent } from './qr-code-operate.component';

describe('QrCodeOperateComponent', () => {
  let component: QrCodeOperateComponent;
  let fixture: ComponentFixture<QrCodeOperateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QrCodeOperateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QrCodeOperateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
