import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveManageComponent } from './approve-manage.component';

describe('ApproveManageComponent', () => {
  let component: ApproveManageComponent;
  let fixture: ComponentFixture<ApproveManageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveManageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
