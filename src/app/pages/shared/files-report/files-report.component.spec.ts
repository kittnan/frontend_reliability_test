import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesReportComponent } from './files-report.component';

describe('FilesReportComponent', () => {
  let component: FilesReportComponent;
  let fixture: ComponentFixture<FilesReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesReportComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilesReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
