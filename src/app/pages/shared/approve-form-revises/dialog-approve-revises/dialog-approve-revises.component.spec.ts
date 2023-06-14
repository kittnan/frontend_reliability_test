import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApproveRevisesComponent } from './dialog-approve-revises.component';

describe('DialogApproveRevisesComponent', () => {
  let component: DialogApproveRevisesComponent;
  let fixture: ComponentFixture<DialogApproveRevisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogApproveRevisesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogApproveRevisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
