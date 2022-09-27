import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QeWindowApproveComponent } from './qe-window-approve.component';

describe('QeWindowApproveComponent', () => {
  let component: QeWindowApproveComponent;
  let fixture: ComponentFixture<QeWindowApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QeWindowApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QeWindowApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
