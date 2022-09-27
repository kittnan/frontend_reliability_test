import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeWindowReportComponent } from './qe-window-report.component';

describe('QeWindowReportComponent', () => {
  let component: QeWindowReportComponent;
  let fixture: ComponentFixture<QeWindowReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeWindowReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeWindowReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
