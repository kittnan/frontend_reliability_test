import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRevisesApproveComponent } from './approve-revises-approve.component';

describe('ApproveRevisesApproveComponent', () => {
  let component: ApproveRevisesApproveComponent;
  let fixture: ComponentFixture<ApproveRevisesApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRevisesApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRevisesApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
