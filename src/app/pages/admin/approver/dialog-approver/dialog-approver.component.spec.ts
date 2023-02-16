import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogApproverComponent } from './dialog-approver.component';

describe('DialogApproverComponent', () => {
  let component: DialogApproverComponent;
  let fixture: ComponentFixture<DialogApproverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogApproverComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogApproverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
