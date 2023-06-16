import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeWindowPersonReviseApproveComponent } from './qe-window-person-revise-approve.component';

describe('QeWindowPersonReviseApproveComponent', () => {
  let component: QeWindowPersonReviseApproveComponent;
  let fixture: ComponentFixture<QeWindowPersonReviseApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeWindowPersonReviseApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeWindowPersonReviseApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
