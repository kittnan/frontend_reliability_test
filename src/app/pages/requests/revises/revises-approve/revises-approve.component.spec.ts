import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisesApproveComponent } from './revises-approve.component';

describe('RevisesApproveComponent', () => {
  let component: RevisesApproveComponent;
  let fixture: ComponentFixture<RevisesApproveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RevisesApproveComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RevisesApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
