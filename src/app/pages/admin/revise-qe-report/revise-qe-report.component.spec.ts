import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviseQeReportComponent } from './revise-qe-report.component';

describe('ReviseQeReportComponent', () => {
  let component: ReviseQeReportComponent;
  let fixture: ComponentFixture<ReviseQeReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviseQeReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviseQeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
