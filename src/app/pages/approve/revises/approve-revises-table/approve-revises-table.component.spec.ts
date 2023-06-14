import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveRevisesTableComponent } from './approve-revises-table.component';

describe('ApproveRevisesTableComponent', () => {
  let component: ApproveRevisesTableComponent;
  let fixture: ComponentFixture<ApproveRevisesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveRevisesTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApproveRevisesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
