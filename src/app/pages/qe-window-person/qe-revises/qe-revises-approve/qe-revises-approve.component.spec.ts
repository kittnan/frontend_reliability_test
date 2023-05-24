import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeRevisesApproveComponent } from './qe-revises-approve.component';

describe('QeRevisesApproveComponent', () => {
  let component: QeRevisesApproveComponent;
  let fixture: ComponentFixture<QeRevisesApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeRevisesApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeRevisesApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
