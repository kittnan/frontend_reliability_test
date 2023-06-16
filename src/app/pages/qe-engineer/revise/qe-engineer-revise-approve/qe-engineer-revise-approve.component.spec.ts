import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeEngineerReviseApproveComponent } from './qe-engineer-revise-approve.component';

describe('QeEngineerReviseApproveComponent', () => {
  let component: QeEngineerReviseApproveComponent;
  let fixture: ComponentFixture<QeEngineerReviseApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeEngineerReviseApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeEngineerReviseApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
