import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeDepartmentManageComponent } from './qe-department-manage.component';

describe('QeDepartmentManageComponent', () => {
  let component: QeDepartmentManageComponent;
  let fixture: ComponentFixture<QeDepartmentManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeDepartmentManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeDepartmentManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
