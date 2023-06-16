import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeSectionHeadReviseApproveComponent } from './qe-section-head-revise-approve.component';

describe('QeSectionHeadReviseApproveComponent', () => {
  let component: QeSectionHeadReviseApproveComponent;
  let fixture: ComponentFixture<QeSectionHeadReviseApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeSectionHeadReviseApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeSectionHeadReviseApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
