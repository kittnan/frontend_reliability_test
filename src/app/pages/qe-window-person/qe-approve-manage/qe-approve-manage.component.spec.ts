import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeApproveManageComponent } from './qe-approve-manage.component';

describe('QeApproveManageComponent', () => {
  let component: QeApproveManageComponent;
  let fixture: ComponentFixture<QeApproveManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeApproveManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeApproveManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
