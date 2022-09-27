import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeEngineerApproveComponent } from './qe-engineer-approve.component';

describe('QeEngineerApproveComponent', () => {
  let component: QeEngineerApproveComponent;
  let fixture: ComponentFixture<QeEngineerApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeEngineerApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeEngineerApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
