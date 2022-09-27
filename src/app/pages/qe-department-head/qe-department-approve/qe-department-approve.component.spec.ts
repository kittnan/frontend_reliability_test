import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeDepartmentApproveComponent } from './qe-department-approve.component';

describe('QeDepartmentApproveComponent', () => {
  let component: QeDepartmentApproveComponent;
  let fixture: ComponentFixture<QeDepartmentApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeDepartmentApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeDepartmentApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
