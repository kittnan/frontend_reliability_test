import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeDepartmentHeadComponent } from './qe-department-head.component';

describe('QeDepartmentHeadComponent', () => {
  let component: QeDepartmentHeadComponent;
  let fixture: ComponentFixture<QeDepartmentHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeDepartmentHeadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeDepartmentHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
