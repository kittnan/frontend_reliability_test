import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeSectionHeadApproveComponent } from './qe-section-head-approve.component';

describe('QeSectionHeadApproveComponent', () => {
  let component: QeSectionHeadApproveComponent;
  let fixture: ComponentFixture<QeSectionHeadApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeSectionHeadApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeSectionHeadApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
