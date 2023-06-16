import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeSectionHeadReviseTableComponent } from './qe-section-head-revise-table.component';

describe('QeSectionHeadReviseTableComponent', () => {
  let component: QeSectionHeadReviseTableComponent;
  let fixture: ComponentFixture<QeSectionHeadReviseTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeSectionHeadReviseTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeSectionHeadReviseTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
