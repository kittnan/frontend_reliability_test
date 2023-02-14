import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeReceiveComponent } from './qe-receive.component';

describe('QeReceiveComponent', () => {
  let component: QeReceiveComponent;
  let fixture: ComponentFixture<QeReceiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeReceiveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
